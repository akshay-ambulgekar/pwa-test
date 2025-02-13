'use client';
/* eslint-disable react/jsx-no-bind */

 import Image from 'next/image';

import Arrow from '@/Images/Otp/arrow-icon.svg';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import VerifyOtpApi from '@/apis/auth/VerifyOtpApi';
import SentOtpApi from '@/apis/auth/SentOtpApi';
import AddCustomerInformationApi from '@/apis/auth/AddCustomerInformationApi';

import PropTypes from 'prop-types';

function SoftLaunchOtpInputs({ accessToken, phone_number, setOtpVerificationStep, sessionId, personalInfoPage = false }) {

    let router = useRouter();
    let otp = useRef([6]);
    let [timer, setTimer] = useState(60);
    let [invalidOtp, setInvalidOtp] = useState(false);
    let [isOtpResend, setIsOtpResend] = useState(false);
    let [payloadSessionId, setPayloadSessionId] = useState(sessionId);




    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1); // Update based on previous value
            }, 1000);

            return () => clearInterval(interval); // Cleanup on unmount or timer reset
        }

        // Explicitly return undefined when timer is 0 or less to satisfy the eslint condition
        return undefined;
    }, [timer]);

    function handleOtp(e, index) {

        let value = e.target.value.replace(/[^0-9 ]/g, "");

        if (value === '') {
            otp.current[index].value = "";
            otp.current[index].classList.remove("custom-text-white", "bg-black");
            return;
        }

        // if (value.length>0) {
        //     const pastedValue = value.split(""); // Split the pasted string into individual characters
        //     pastedValue.forEach((char, idx) => {
        //         const currentIndex =  idx;
        //         // if (currentIndex < otp.current.length) {
        //             otp.current[currentIndex].value = char;
        //             otp.current[currentIndex].classList.add("custom-text-white", "bg-black");
        //         // }
        //     });

        //     // Focus the last filled input
        //     const nextIndex = index + pastedValue.length;
        //     if (nextIndex < otp.current.length) {
        //         otp.current[nextIndex]?.focus();
        //     } else if (allInputsFilled()) {
        //         verifyOtp(); // Trigger API call if all inputs are filled
        //     }
        //     return;
        // }


        if (value.length > 0) {
            otp.current[index].classList.add("custom-text-white", "bg-black");
        }

        if (value.length === 1 && index < 5) {
            otp.current[index + 1].focus();
        }

        //when all fields get filled then api hit automactically
        if (allInputsFilled()) {
            verifyOtp();
        }

    }

    function handleBackspace(e, index) {
        let value = e.target.value.replace(/[^0-9 ]/g, "");

        if (e.key === 'Backspace' && value === '') {
            otp.current[index - 1]?.focus();
        }

    }
    //if we pass the true to this function as parameter then enter mobile number will get opened otherwise it will remove entered otp
    function handleBackBtn(backBtnpressed = false) {
        // Reset all OTP input fields
        otp.current.forEach((element) => {
            if (element) {
                element.value = ""; // Clear the input value
                element.classList.remove("custom-text-white", "bg-black"); // Remove the applied classes
            }
        });

        otp.current[0].focus();

        if (backBtnpressed) {
            //set the previous view
            setOtpVerificationStep(0);
        }
    }

    //verify otp
    function verifyOtp() {
        setInvalidOtp(false);


        //this is for if someone try to edit the full name from personal info page
        if (personalInfoPage) {
            let obj = {
                "phone": "+91" + phone_number,
            };
            AddCustomerInformationApi(obj, accessToken)
                .then((response) => {
                    if (response && "message" in response && response.message === 'User details updated successfully') {
                        router.push('/my-account/settings-and-activity/personal-information');
                    }
                });
        }
        else {

            let payloadObj = {
                "phone": "+91" + phone_number,
                "session_uuid": payloadSessionId,
                "otp": getOtp()
            };

            VerifyOtpApi(payloadObj, accessToken)
                .then((response) => {

                    if (response && 'message' in response) {
                        if (response.message === 'Mobile number verified successfully.') {
                            if (personalInfoPage) {
                                router.push('/my-account/settings-and-activity/personal-information');
                            }
                            else {
                                router.push('/auth/user-information');
                            }
                        }
                        if (response.message === 'session validation failed' || response.message === 'session_uuid is not valid' || response.message === 'Invalid OTP or expired.') {
                            setInvalidOtp(true);
                            handleBackBtn();
                        }
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }

    //to check all input fileds are filled
    function allInputsFilled() {
        let value = otp.current.every(element => element.value.length > 0);
        return value;
    }

    //to return otp;
    function getOtp() {
        let payloadOtp = '';

        otp.current.forEach((element) => {
            payloadOtp = payloadOtp + element.value;
        });

        return payloadOtp;
    }


    //to resend otp
    let handleResendOtp=useCallback(()=> {
        let obj = {
            'phone_number': '+91' + phone_number
        };
        setIsOtpResend(false);

        SentOtpApi(obj)
            .then((response) => {
                if (response && 'data' in response) {
                    if ('session_uuid' in response.data) {
                        setPayloadSessionId(response.data.session_uuid);
                        setIsOtpResend(true);
                        handleBackBtn();
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });
    },[]);

    //if user click on back button
    let handleClickBackBtn=useCallback(()=>
    {
        handleBackBtn(true);
    },[]);
    return (
        <>
            {/* <section className={"flex justify-center h-screen w-full background-custom-grey100  overflow-hidden "+plus_jakarta_sans.className}> */}
            <div className="page-center-parent-container  small-border background-custom-grey50 p-6 vh100 relative">
                <Image src={Arrow} width={36} height={36} alt='img' quality={100} className='cursor-pointer ' onClick={handleClickBackBtn} />
                <div className="flex flex-col  pt-24 pb-10  gap-8  ">
                    <div className="flex flex-col gap-10 ">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <h2 className="heading-h2 custom-text-grey900 ">Enter 6 digit code we sent to <br />+91 {phone_number}</h2>
                            </div>
                            <div className="flex flex-col gap-5 ">
                                <div className="grid grid-cols-6 small-border border-l-0 custom-border-grey800 w-full ">
                                    {Array(6).fill(0).map((element, index) => {
                                        return <div className={`${index > 0 ? ' small-border-left ' : ''} h-16 custom-border-grey800 flex justify-center items-center `} key={index}>
                                            <input type="tel" ref={ref => (otp.current[index] = ref)} maxLength={1} className={`outline-none h-full px-5 heading-h2 w-full otp-input-fields text-center `} onChange={(e) => { handleOtp(e, index); }} onKeyDown={(e) => { handleBackspace(e, index); }} />
                                        </div>;
                                    })}

                                </div>
                                {invalidOtp && <div className="custom-text-alert body-sm">Incorrect Code or Otp Expired</div>}

                                {timer > 0 ? <div className="custom-text-grey600 body-sm">Resend code in 00:{timer}sec</div> :
                                    <div className="custom-text-grey800 body-sm-bold cursor-pointer underline" onClick={handleResendOtp}>Resend code</div>}

                                {isOtpResend && <div className="custom-text-grey800 body-sm cursor-pointer " >Code Resend!</div>}

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* </section> */}
        </>
    );
}

export default SoftLaunchOtpInputs;

SoftLaunchOtpInputs.propTypes={
    accessToken:PropTypes.string,
    phone_number:PropTypes.string,
    setOtpVerificationStep:PropTypes.func,
    sessionId:PropTypes.string,
    personalInfoPage:PropTypes.bool
};