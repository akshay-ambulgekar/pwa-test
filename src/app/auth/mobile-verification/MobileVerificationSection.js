'use client';
import { useCallback, useEffect, useState } from "react";
import SoftLaunchOtpInputs from '@/Components/SoftLaunchOtpInputs';
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import IntialLoadingAnimation from '@/Components/InitialPageLoadingAnimation';
import LoadingAnimation from '@/app/auth/LoadingAnimation';
import SanitizeInputs from '@/SanitizingInputs/SanitizeInputs';
import SentOtpApi from '@/apis/auth/SentOtpApi';
import Arrow from '@/Images/Otp/arrow-icon.svg';

import { useSearchParams } from 'next/navigation';
import Image from "next/image";
import { useRouter } from "next/navigation";


function MobileVerificationSection()
{
 
     //phone numebr input view states
     let[phoneNumber,setPhoneNumber]=useState('');
     let[invalidPhoneNumebr,setInvalidPhoneNumber]=useState(false);
     let[sessionId,setSessionId]=useState('');
     let[sendingOtp,setSendingOtp]=useState(false);
 
     let[otpVerificationStep,setOtpVerificationStep]=useState(0);
     let[accessToken,setAccessToken]=useState('');
     let[gettingAccessToken,setGettingAccessToken]=useState(true);
 
     let[personalInfoPage,setPersonalInfoPage]=useState(false);


    let router=useRouter();

    let params=useSearchParams();


    useEffect(()=>{
        let isAccessingFromPersonalInfoPage=params.get('personalInfo');
        if(isAccessingFromPersonalInfoPage)
        {
            setPersonalInfoPage(true);
        }
    },[params]);
 
     useEffect(()=>{
         getAccessToken();
     },[]);
 
   
 
   
 
     //phone numebr input view functions
 
     let handlePhoneInput=useCallback((e)=>
     {
         let value=e.target.value.replace(/[^0-9 ]/g, "");
 
         let sanitizedValue=SanitizeInputs(value);
         setPhoneNumber(sanitizedValue);
         setInvalidPhoneNumber(false);
     },[]);
 
     //if user press enter key
     let handleMobileNumberKeyEnter=useCallback((e)=>
     {
         if(e.key==='Enter')
         {
             handleSendOtp();
         }
     },[]);
     let handleSendOtp=useCallback(()=>
     {
         setInvalidPhoneNumber(phoneNumber.length<10);
         if(phoneNumber.length<10)
         {
             return;
         }
         let obj={
             'phone_number':'+91'+phoneNumber
         };
         setSendingOtp(true);
         SentOtpApi(obj)
         .then((response)=>{
             if(response&&'data' in response)
             {
                 if('session_uuid' in response.data)
                 {
                     setSessionId(response.data.session_uuid);
                     setOtpVerificationStep(1);
                 }
             }
         })
         .catch((error)=>{
             console.error(error);
         })
         .finally(()=>{
             setSendingOtp(false);
         });
     },[]);
 
 
      //getting access token
      function getAccessToken()
      {
          GetAccessTokenAPI()
          .then((response)=>{
                if(response&&'message' in response&&response.message==='Refresh token is missing!')
                {
                    window.location.href='/auth/user-auth';
                }
              if(response&&'access_token' in response)
              {
                  setAccessToken(response.access_token);
              }
              
          })
          .catch((error)=>{
            console.error(error);
          })
          .finally();
          {
              setGettingAccessToken(false);
          }
      }
  
      if(gettingAccessToken)
      {
         return <IntialLoadingAnimation/>;
      }

      let handleFullNameBackBtnClick=useCallback(()=>
      {
         router.push('/my-account/settings-activity/personal-info');
      },[]);
    return(
        <>
         {accessToken&&otpVerificationStep===0&&
            // <section className={"flex justify-center  background-custom-grey50  h-screen overflow-hidden "+plus_jakarta_sans.className}>
                <div className="page-center-parent-container background-custom-grey50 border-black vh100 p-6 small-border border-custom-grey800 relative">

                    <div className="">
                        {personalInfoPage&&<Image src={Arrow} width={32} height={32} alt='img' quality={100} className='cursor-pointer' onClick={handleFullNameBackBtnClick}/>}

                        <div className="flex flex-col gap-8 py-20">
                            <div className="flex flex-col gap-2">
                                <h2 className="heading-h2 custom-text-grey900 ">Verify your phone number</h2>
                                <div className="body-sm custom-text-grey700">We secure your account, not spam it</div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-1.5">
                                    <div className="all-caps-12-bold custom-text-grey900">Phone Number</div>
                                    <input type="tel" name="phone" maxLength={10} value={phoneNumber}  className='w-full small-border border-black outline-none py-3.5 px-5 ' onChange={handlePhoneInput} onKeyDown={handleMobileNumberKeyEnter}/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    {invalidPhoneNumebr&&<div className="custom-text-alert body-sm text-center">Please enter a valid Phone Number</div>}
                                    <button className={`py-4 px-7 w-full  bg-black ' shadow-sm custom-text-white all-caps-12 text-center flex justify-center items-center `} onClick={handleSendOtp} disabled={sendingOtp}>{sendingOtp?<LoadingAnimation borderColor='border-white' />:'Send Otp'}</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>}



            {otpVerificationStep===1&&<SoftLaunchOtpInputs setOtpVerificationStep={setOtpVerificationStep} sessionId={sessionId} accessToken={accessToken} phone_number={phoneNumber} personalInfoPage={personalInfoPage}/>}
             {/* </section>} */}


        </>
    );
}

export default MobileVerificationSection;