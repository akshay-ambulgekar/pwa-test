'use client';
import Image from 'next/image';

import Arrow from '@/Images/Auth/arrow-icon.svg';
import { useCallback, useEffect, useState } from 'react';
import ForgotPasswordApi from '@/apis/auth/ForgotPasswordApi';

import PropTypes from 'prop-types';



function ResetPasswordEmailResendSection({ email, setResetPasswordSteps, alreadyRegistered }) {

    let [timer, setTimer] = useState(60);
    let [emailRegistered, setEmailRegistered] = useState(false);


    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1); // Update based on previous value
            }, 1000);

            return () => clearInterval(interval); // Cleanup on unmount or timer reset
        }
        return undefined;
    }, [timer]);

    useEffect(() => {
        if (alreadyRegistered) {
            handleResendEmail();
        }
    }, [alreadyRegistered]);

    //handleing resend email
    let handleResendEmail = useCallback(() => {
        let obj = {
            'login_value': email
        };

        ForgotPasswordApi(obj)
            .then((response) => {
                // console.log(response);
                if (response && 'message' in response) {
                    if (response.message === 'Password reset link has been sent to your email.') {
                        setTimer(60);
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }, [email]);

    //handling back click button
    let handleBackBtn = useCallback(() => {
        setResetPasswordSteps(0);
    }, [setResetPasswordSteps]);
    return (
        <>

            <div className="page-center-parent-container vh100 overflow-hidden border-black small-border custom-border-grey600 background-custom-white">

                <div className="flex flex-col px-6 pt-24 pb-10 background-custom-grey100 gap-8 h-screen relative ">

                    <Image src={Arrow} width={36} height={36} alt='img' quality={100} className='cursor-pointer absolute top-6 left-6' onClick={handleBackBtn} />
                    <div className="flex flex-col gap-10 ">

                        <div className="flex flex-col gap-8">

                            <div className="flex flex-col gap-2">
                                <h3 className="heading-h3 custom-text-grey900 ">We&apos;ve sent a verification link to {email} </h3>
                                <div className="body-sm custom-text-grey700">We&apos;re one step closer to setting a new password</div>
                            </div>

                            {emailRegistered ? <span className="custom-text-alert body-sm">Your email is already verified.</span>
                                : <h5 className="heading-h5 custom-text-grey900">To verify your email, tap the button in the email we sent you</h5>}

                            {timer > 0 ? <div className="custom-text-grey500 body-sm">Resend link in 00:{timer}sec</div> :
                                <div className="custom-text-grey800 body-sm-bold cursor-pointer underline" onClick={handleResendEmail}>Resend link</div>}

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default ResetPasswordEmailResendSection;



ResetPasswordEmailResendSection.propTypes = {
    email: PropTypes.string,
    setResetPasswordSteps: PropTypes.func,
    alreadyRegistered: PropTypes.bool
};