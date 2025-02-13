'use client';

import Arrow from '@/Images/Otp/arrow-icon.svg';
import SanitizeInputs from '@/SanitizingInputs/SanitizeInputs';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

//userview 2
import Badge from '@/Images/UserInfo/Badge.png';
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import IntialLoadingAnimation from '@/Components/InitialPageLoadingAnimation';
import LoadingAnimation from '@/app/auth/LoadingAnimation';
import AddCustomerInformationApi from '../../../apis/auth/AddCustomerInformationApi';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';


function UserInformationSection()
{
    
     //initail user nmae and sir name view states
    let[name,setName]=useState('');
    let[lastName,setLastName]=useState('');
    let[nameLastNameFilled,setNameLastNameFilled]=useState(false);

    let[loadingAnimation,setLoadingAnimation]=useState(false);

    let[userInfoView,setUserInfoView]=useState(0);
    let[accessToken,setAccessToken]=useState('');
    let[gettingAccessToken,setGettingAccessToken]=useState(true);

    let[personalInfoPage,setPersonalInfoPage]=useState(false);

    let router=useRouter();

    let params=useSearchParams();

    useEffect(()=>{
        getAccessToken();
    },[]);

    useEffect(()=>{
        let isAccessingFromPersonalInfoPage=params.get('personalInfo');
        if(isAccessingFromPersonalInfoPage)
        {
            setPersonalInfoPage(true);
        }
    },[params]);

    //initail user nmae and sir name view functions

    //to handle input of first name
    let handleUserNameInput=useCallback((e)=>
    {
        let sanitizedValue=SanitizeInputs(e.target.value);
        setName(sanitizedValue);
        setNameLastNameFilled(false);
    },[name,nameLastNameFilled]);

    //to handle input of last name
    let handleLastNameInput=useCallback((e)=>
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

    //sending name sir name to api
    let handleCorrectButton=useCallback(()=>
    {
        setNameLastNameFilled(name.length<1 || lastName.length<1);

        if(name.length<1 || lastName.length<1)
        {
            return;
        }

        let obj={
            "first_name":name,
            "last_name":lastName,
         };
         
        setLoadingAnimation(true);

        AddCustomerInformationApi(obj,accessToken)
        .then((response)=>{
            if(response&&"message" in response&&response.message==='User details updated successfully')
            {   
                //this is for if someone try to edit the full name from personal info page
                if(personalInfoPage)
                {
                    router.push('/my-account/settings-activity/personal-info');
                }
                else{
                    setUserInfoView(1);
                }
            }
        })
        .catch((error)=>{
            console.error(error);
        })
        .finally(()=>{
            setLoadingAnimation(false);
        });


    },[]);


    //badge view functions
    let handleBadgeViewProceed=useCallback(()=>
    {
        router.push('/');
    },[]);

    //common function for handling the back button click
    let handleBackButtonClick=useCallback(()=>
    {
        setUserInfoView(userInfoView-1);
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


     let handleFullNameBackBtnClick=useCallback(()=>
     {
        router.push('/my-account/settings-activity/personal-info');
     },[]);
 
     if(gettingAccessToken)
     {
        return <IntialLoadingAnimation/>;
     }
    return(
        <>
            {accessToken&&userInfoView===0&&
            // <section className={"flex justify-center  background-custom-grey50  h-screen  overflow-hidden "+plus_jakarta_sans.className}>
                <div className="page-center-parent-container h-screen background-custom-grey50 border-black overflow-hidden px-6 py-4 small-border border-custom-grey800 ">
                    <div className="flex flex-col gap-10 ">
                        {personalInfoPage&&<Image src={Arrow} width={32} height={32} alt='img' quality={100} className='cursor-pointer' onClick={handleFullNameBackBtnClick}/>}
                        
                        <div className="flex flex-col gap-8 py-20">
                            <div className="flex flex-col gap-2">
                               {personalInfoPage? <h2 className="heading-h2 custom-text-grey900 ">Change my full name</h2>
                                :<h2 className="heading-h2 custom-text-grey900 ">Quick intros... 
                                <br />What should we call you?</h2>}
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
                                <button className={`py-4 px-7 w-full  background-custom-grey900 shadow-sm custom-text-white all-caps-12-bold flex justify-center `} onClick={handleCorrectButton}>{loadingAnimation?<LoadingAnimation borderColor='border-white' />:'Confirm'}</button>
                            </div>

                        </div>
                    </div>

                </div>}
            {/* </section>} */}
            {userInfoView===1&&
                <div className="page-center-parent-container background-custom-grey50 border-black h-screen p-6  small-border border-custom-grey800 relative">

                        <Image src={Arrow} width={32} height={32} alt='img' quality={100} className='cursor-pointer' onClick={handleBackButtonClick}/>
                            
                            <div className="flex flex-col gap-6 items-center py-24">
                            
                                <div className="flex flex-col items-center gap-5">
                                    <Image src={Badge} width={200} height={200} alt='img' quality={100} className='  cursor-pointer'/>          
                                    <div className="flex flex-col gap-2.5 items-center">
                                        <h2 className="heading-h2 text-center max-w-xs w-full">Yay {name}! You&apos;re now on the Welcome Tier!</h2>
                                        <div className="body-sm custom-text-grey800">One last step...</div>
                                    </div>     
                                </div>
                                <button className={`py-4 px-7 w-full background-custom-grey900 shadow-sm custom-text-white all-caps-12`}  onClick={handleBadgeViewProceed}>Proceed</button>

                            </div>

                </div>}

         

        </>
    );
}

export default UserInformationSection;