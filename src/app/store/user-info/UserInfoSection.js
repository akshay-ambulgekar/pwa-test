'use client';

import Arrow from '@/Images/Otp/arrow-icon.svg';
import SanitizeInputs from '@/SanitizingInputs/SanitizeInputs';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

//userview 2
import Badge from '@/Images/UserInfo/Badge.png';
import SentOtpApi from '@/apis/auth/SentOtpApi';
import SoftLaunchOtpInputs from '@/Components/SoftLaunchOtpInputs';
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import IntialLoadingAnimation from '@/Components/InitialPageLoadingAnimation';
import LoadingAnimation from '@/app/auth/LoadingAnimation';


function UserInfoSection()
{
    
     //initail user nmae and sir name view states
    let[name,setName]=useState('');
    let[lastName,setLastName]=useState('');
    let[nameLastNameFilled,setNameLastNameFilled]=useState(false);

    //phone numebr input view states
    let[phoneNumber,setPhoneNumber]=useState('');
    let[invalidPhoneNumebr,setInvalidPhoneNumber]=useState(false);
    let[sessionId,setSessionId]=useState('');
    let[sendingOtp,setSendingOtp]=useState(false);

    let[userInfoView,setUserInfoView]=useState(0);
    let[accessToken,setAccessToken]=useState('');
    let[gettingAccessToken,setGettingAccessToken]=useState(true);


    useEffect(()=>{
        getAccessToken();
    },[]);


    //to handle input of first name
    let handleUserNameInput=useCallback((e)=>
    {
        let sanitizedValue=SanitizeInputs(e.target.value);
        setName(sanitizedValue);
        setNameLastNameFilled(false);
    },[name,nameLastNameFilled]);

    //to handle input of last name
    let handleLastNameInput = useCallback((e)=>
    {
        let sanitizedValue=SanitizeInputs(e.target.value);
        setLastName(sanitizedValue);
        setNameLastNameFilled(false);
    },[lastName,nameLastNameFilled]);

    //if user press enter key while filling last name field
    let handleLastNameEnterKeyDown=useCallback((e)=>
    {
        if(e.key==='Enter')
        {
            handleCorrectButton();
        }
    },[]);

    let handleCorrectButton=useCallback(()=>
    {
        setNameLastNameFilled(name.length<1 || lastName.length<1);

        if(name.length<1 || lastName.length<1)
        {
            return;
        }
        setUserInfoView(1);
    },[]);


    //badge view functions
    let handleBadgeViewProceed=useCallback(()=>
    {
        setUserInfoView(2);
    },[userInfoView]);

   // Inside the component
    const handleBackButtonClick = useCallback(() => {
        setUserInfoView(userInfoView - 1);
    }, [userInfoView]);



    //phone numebr input view functions

    let handlePhoneInput=useCallback((e)=>
    {
        let value=e.target.value.replace(/[^0-9 ]/g, "");

        let sanitizedValue=SanitizeInputs(value);
        setPhoneNumber(sanitizedValue);
        setInvalidPhoneNumber(false);
    },[phoneNumber,invalidPhoneNumebr]);

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
                    setUserInfoView(3);
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
             if(response&&'access_token' in response)
             {
                 setAccessToken(response.access_token);
             }
             
         })
         .catch((error)=>{
            console.error(error);
         })
         .finally(()=>{
                setGettingAccessToken(false);
         });
         
     }
 
     if(gettingAccessToken)
     {
        return <IntialLoadingAnimation/>;
     }
    return(
        <>
            {userInfoView===0&&
                <div className="page-center-parent-container background-custom-grey50 border-black overflow-hidden px-6 py-24 small-border border-custom-grey800 h-full ">
                    <div className="flex flex-col gap-10 ">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <h2 className="heading-h2 custom-text-grey900 ">Quick intros... 
                                <br />What should we call you?</h2>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <div className="all-caps-12-bold custom-text-grey900">First name</div>
                                <input type="text" name="name" value={name} className='w-full small-border border-black  outline-none py-3.5 px-5 ' onChange={handleUserNameInput} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <div className="all-caps-12-bold custom-text-grey900">Last name</div>
                                <input type="text" name="lastname" value={lastName} className='w-full small-border border-black  outline-none py-3.5 px-5 ' onChange={handleLastNameInput} onKeyDown={handleLastNameEnterKeyDown}/>
                            </div>
                            <div className="flex flex-col gap-1">
                                {nameLastNameFilled&&<div className="custom-text-alert body-sm text-center">Please enter a valid ipnuts</div>}
                                <button className={`py-4 px-7 w-full  background-custom-grey900 shadow-sm custom-text-white all-caps-12-bold `} onClick={handleCorrectButton}>Confirm</button>
                            </div>

                        </div>
                    </div>

                </div>}
            {userInfoView===1&&
                <div className="page-center-parent-container background-custom-grey50 border-black overflow-hidden p-6  small-border border-custom-grey800 relative">

                        <Image src={Arrow} width={32} height={32} alt='img' quality={100} className='cursor-pointer' onClick={handleBackButtonClick}/>
                            
                            <div className="flex flex-col gap-6 items-center py-24">
                            
                                <div className="flex flex-col items-center gap-5">
                                    <Image src={Badge} width={200} height={200} alt='img' quality={100} className='  cursor-pointer'/>          
                                    <div className="flex flex-col gap-2.5 items-center">
                                        <h2 className="heading-h2 text-center max-w-xs w-full">Yay! You&apos;re now on the Welcome Tier!</h2>
                                        <div className="body-sm custom-text-grey800">One last step...</div>
                                    </div>     
                                </div>
                                <button className={`py-4 px-7 w-full background-custom-grey900 shadow-sm custom-text-white all-caps-12`}  onClick={handleBadgeViewProceed}>Proceed</button>

                            </div>

                </div>}
            {userInfoView===2&&
                <div className="page-center-parent-container background-custom-grey50 border-black  overflow-hidden p-6  small-border border-custom-grey800 relative">

                        <Image src={Arrow} width={32} height={32} alt='img' quality={100} className='cursor-pointer' onClick={handleBackButtonClick}/>

                        <div className="flex flex-col gap-8 py-24">
                            <div className="flex flex-col gap-2">
                                <h2 className="heading-h2 custom-text-grey900 ">Verify your phone number</h2>
                                <div className="body-sm custom-text-grey700">We secure your account, not spam it</div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-1.5">
                                    <div className="all-caps-12-bold custom-text-grey900">Phone Number</div>
                                    <input type="text" name="phone" maxLength={10} value={phoneNumber}  className='w-full small-border border-black outline-none py-3.5 px-5 ' onChange={handlePhoneInput} onKeyDown={handleMobileNumberKeyEnter}/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    {invalidPhoneNumebr&&<div className="custom-text-alert body-sm text-center">Please enter a valid Phone Number</div>}
                                    <button className={`py-4 px-7 w-full  bg-black ' shadow-sm custom-text-white all-caps-12 text-center flex justify-center items-center `} onClick={handleSendOtp} disabled={sendingOtp}>{sendingOtp?<LoadingAnimation borderColor='border-white' />:'Send Otp'}</button>
                                </div>
                            </div>

                        </div>


                </div>}
            {userInfoView===3&&<SoftLaunchOtpInputs name={name} lastname={lastName} setUserInfoView={setUserInfoView} sessionId={sessionId} accessToken={accessToken} phone_number={phoneNumber}/>}


        </>
    );
}

export default UserInfoSection;