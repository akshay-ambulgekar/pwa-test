'use client';
import Image from 'next/image';

import Arrow from '@/Images/Auth/arrow-icon.svg';
import { useCallback, useEffect, useState } from 'react';
import UserResendMail from '@/apis/auth/UserResendMail';

import PropTypes from 'prop-types';

    

function SignUpByEmail({email,setRegisterSteps,alreadyRegistered})
{

    let[timer,setTimer]=useState(60);
    let[emailRegistered,setEmailRegistered]=useState(false);

    let[iseLinkSent,setIsLinkSent]=useState(false);


    useEffect(()=>{
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1); // Update based on previous value
            }, 1000);
    
            return () => clearInterval(interval); // Cleanup on unmount or timer reset
        }
        return undefined;
    },[timer]);

    useEffect(()=>{
        if(alreadyRegistered)
        {
            handleResendEmail();
        }
    },[alreadyRegistered]);

    //handleing resend email
    let handleResendEmail=useCallback(()=>
    {
        let obj={
            'email':email
        };
        setIsLinkSent(false);
        UserResendMail(obj)
        .then((response)=>{
            if(response&&'message' in response&&response.message==='A new verification email has been sent. Please check your inbox.')
            {
                    setTimer(60);   
                    setIsLinkSent(true);
            }
            if(response&&'message' in response&&response.message==='Your email is already verified.')
            {
                setEmailRegistered(true);
            }
        })
        .catch((error)=>{
            console.error(error);
            if(error&&'message' in error&&error.message==='Your email is already verified.')
            {
                setEmailRegistered(true);
            }
        });

    }
,[]);
    //handling back click button
    let handleBackBtn=useCallback(()=>
    {
        setRegisterSteps(0);
    },[]);
    return(
        <>
        <section className={"flex justify-center h-screen w-full background-custom-grey100  overflow-hidden "}>
            
            <div className="page-center-parent-container small-border custom-border-grey600 background-custom-white">
                
                <div className="flex flex-col px-6 pt-6 pb-10 background-custom-grey100 gap-8 h-screen ">
                    
                        <div className="flex flex-col gap-10 ">
                            <Image src={Arrow} width={36} height={36} alt='img' quality={100} className='cursor-pointer' onClick={handleBackBtn} />

                            <div className="flex flex-col gap-8">

                                <div className="flex flex-col gap-2">
                                    <h2 className="heading-h2 custom-text-grey900 ">We&apos;ve sent a verification link to {email} </h2>
                                    <div className="body-sm custom-text-grey700">This helps us keep your account secure</div>
                                </div>

                               {emailRegistered? <span className="custom-text-alert body-sm">Your email is already verified.</span>
                               : <h5 className="body-bold custom-text-grey900">Click on the confirm button in the email we&apos;ve sent you</h5>}

                                {timer > 0 ? <div className="custom-text-grey500 body-sm">Resend link in 00:{timer}sec</div> :
                                <div className="custom-text-grey800 body-sm-bold cursor-pointer underline" onClick={handleResendEmail}>Resend link</div>
                                    }
                                    {iseLinkSent&&<div className="custom-text-grey800 body-sm-bold  " >Link Resent!</div>}

                            </div>
                        </div>

                </div>
            </div>
        </section>
        </>
    );
}

export default SignUpByEmail;


SignUpByEmail.propTypes={
    email:PropTypes.string,
    setRegisterSteps:PropTypes.func,
    alreadyRegistered:PropTypes.bool
};