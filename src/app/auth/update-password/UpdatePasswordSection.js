'use client';
//this below line will prevent to generate static page
export const dynamic='force-dynamic';
import Image from 'next/image';


import Arrow from '@/Images/Otp/arrow-icon.svg';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PasswordValidationBoxes, { verifyPasswordIsMatchingToCriteriaWhileTyping } from '@/Components/PasswordValidation';
import ResetPasswordApi from '@/apis/auth/ResetPasswordApi';
import SanitizeInputs from '@/SanitizingInputs/SanitizeInputs';

 

function UpdatePasswordSection()
{

    let router=useRouter();
    let[password,setPassword]=useState('');
    let[confirmPassword,setConfirmPassword]=useState('');
    let[inValidPassword,setInvalidPassword]=useState(true);
    let[passwordConfirmPasswordNotMatching,setPasswordConfirmPasswordNotMatching]=useState(false);
    let[token,setToken]=useState('');

    //if user entered his previous password then this state will become true to show error massage
    let[enteredPreviousPassword,setEnteredPreviousPassword]=useState(false);

    //if user session has been expired then to show error massage
    let[sessionExpired,setSessionExpired]=useState(false);



    //to access token from url
    let params=useSearchParams();

    useEffect(()=>{
        let invalidPassword=verifyPasswordIsMatchingToCriteriaWhileTyping(password);
        setInvalidPassword(invalidPassword);
        // setEnteredPreviousPassword(false);
    },[password]);

    useEffect(()=>{
        let urlToken=params?.get('token');
        setToken(urlToken);
    },[params]);

    //when click on proceed
    let handleClickProceed=useCallback(()=>
    {

        setPasswordConfirmPasswordNotMatching(password!==confirmPassword || confirmPassword.length<1);
        if(password!==confirmPassword || inValidPassword)
        {
            return;
        }
        let obj={
            'new_password':password
        };
        ResetPasswordApi(obj,token)
        .then((response)=>{
            
            if(response&&'status' in response&&response.status==='success'&&'message' in response&&response.message==='Password has been reset successfully.')
            {
                router.push('/auth/reset-password-sucess');
            }

            if(response&&'status' in response&&response.status==='error'&&'message' in response&&response.message==='Invalid or expired token.')
            {
                setSessionExpired(true);
            }
            
            if(response&&'message' in response&&response.message==='New password is required.' )
            {
                //to show error message if user entered a previous password
                setEnteredPreviousPassword(true);
                setPassword('');
                setConfirmPassword('');
            }
        })
        .catch((error)=>{
            console.error(error);
            
        });
    },[password,confirmPassword,inValidPassword]);

    //to hanlde password input 
    let handlePasswordInput=useCallback((e)=>{
        let value=e.target.value;
        let sanitizedValue=SanitizeInputs(value);
        setPassword(sanitizedValue); 
    },[password]);


    let handleConfirmPassKeyDown=useCallback((e)=>
    {
        if(e.key==='Enter')
        {
            handleClickProceed();
        }
    },[]);


    //to handle confirm password
    let handleConfirmPasswordInput=useCallback((e)=>{
        let value=e.target.value;
        let sanitizedValue=SanitizeInputs(value);
        setConfirmPassword(sanitizedValue); 
    },[confirmPassword]);

    //if user click on back button
    let handleBackClick=useCallback(()=>
    {
        router.push('/auth/reset-password');
    },[]);


    return(
        <>
        <section className={"flex justify-center h-screen w-full background-custom-grey100  overflow-hidden "}>
            <div className="page-center-parent-container w-full  h-screen small-border border-black">
                <div className="flex flex-col px-6 pt-2 pb-10 background-custom-grey100 gap-8 h-screen ">
                    <div className="flex flex-col gap-10 ">
                        <Image src={Arrow} width={36} height={36} alt='img' quality={100} className='cursor-pointer' onClick={handleBackClick}/>
                      <div className="flex flex-col gap-8">
                        <h3 className="heading-h3">Update your password</h3>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1.5">
                                <div className="body-sm-bold custom-text-grey900">Password</div>
                                <input type="password" name="password" value={password} className='w-full border border-custom-grey300 outline-none py-3.5 px-5 ' onChange={handlePasswordInput} />
                            </div>
                           <PasswordValidationBoxes password={password} />
                        </div>
                    </div>

                         <div className="flex flex-col gap-1.5">
                            <div className="body-sm-bold custom-text-grey900">Confirm Password</div>
                            <input type="password" name="password" value={confirmPassword} className='w-full border border-custom-grey300 outline-none py-3.5 px-5 ' onChange={handleConfirmPasswordInput} onKeyDown={handleConfirmPassKeyDown}/>
                            {passwordConfirmPasswordNotMatching&&<span className="custom-text-alert body-sm">Passwords do not match. Please try again</span>}
                        </div>
                        
                        <div className="flex flex-col gap-1">
                            {enteredPreviousPassword&&<div className="custom-text-alert body-sm text-center">New password is required.</div>}
                            {sessionExpired&&<div className="custom-text-alert body-sm text-center">Your Session has been Expired Please Go Back To Reset Password</div>}
                            <button className={`py-4 px-7 w-full ${inValidPassword?' background-custom-grey500 ':' bg-black '} shadow-sm custom-text-white all-caps-12`} disabled={inValidPassword} onClick={handleClickProceed}>Proceed</button>
                        </div>

                    </div>

                </div>
            </div>
        </section>
        </>
    );
}

export default UpdatePasswordSection;