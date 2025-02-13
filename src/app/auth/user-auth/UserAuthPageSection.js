'use client';

//to avoid generate asa static page
export const dynamic='force-dynamic';

import Image from 'next/image';

import Link from 'next/link';

import Google from '@/Images/UserAuth/google-icon.svg';
import { useCallback, useEffect, useRef, useState } from 'react';
import PasswordValidationBoxes, { verifyPasswordIsMatchingToCriteriaWhileTyping } from '@/Components/PasswordValidation';
import SanitizeInputs from '@/SanitizingInputs/SanitizeInputs';
import SignUpByEmail from './SignUpByEmail';
import { useRouter, useSearchParams } from 'next/navigation';
import UserLogin from '@/apis/auth/UserLogin';
import LoadingAnimation from '../LoadingAnimation';
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import UserRegisterApi from '@/apis/auth/UserRegisterApi';





function UserAuthPageSection() {

    //storing values in state
    let[email,setEmail]=useState('');
    let[password,setPassword]=useState('');

    //to verify input email or password  is empty or invalid 
    let[invalidEmail,setInvalidEmail]=useState(true);
    let[invalidPassword,setInvalidPassword]=useState(true);

    //to open modal and continue with email view 

    let[registerSteps,setRegisterSteps]=useState(0);

    //if the user is already verified with email then show alert message by using this state
    let[userAlreadyVerified,setUserAlreadyVerified]=useState(false);
     //if the user inputed invalid credential alert message by using this state
     let[invalidCredentails,setInvalidCredentials]=useState(false);

     //if the user is already registered with email
    let[userAlreadyRegistered,setUserAlreadyRegistered]=useState(false);

    let[signInView,setSignInView]=useState(false);

    let[loadingAnimation,setLoadingAnimation]=useState(false);

    // let[accessToken,setAccessToken]=useState('');



    let emailfield=useRef();

    let paramsValue=useSearchParams();

    let router=useRouter();




      //checking email is valid or not with regx
      useEffect(()=>{
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  //email validation
            setInvalidEmail(!emailRegex.test(email));
     
            //checking password is valid or not with function
            let isPasswordValid=verifyPasswordIsMatchingToCriteriaWhileTyping(password);
            setInvalidPassword(isPasswordValid);
      },[email,password]);



      //if the url contains the auth=login query then this signInview will gets assign to tru and forgot password & not a member sign up link will get rendered
      useEffect(()=>{
        let referrelId=paramsValue?.get('referral_code');
        if(referrelId)
        {
            sessionStorage.setItem('ref',referrelId);
        }
        let islogin=paramsValue?.get('auth');
        setSignInView(islogin==='login');
        //when we change the view like sign up or login this below fields are becoming empty
            setEmail('');
            setPassword('');
            setInvalidCredentials(false);
            setUserAlreadyVerified(false);

      },[paramsValue]);

      useEffect(()=>{
        getAccessToken();
      },[]);


      //handling email input 
      let handleEmailInput=useCallback((e)=>
      {
        let value=e.target.value;
        let sanitizedValue=SanitizeInputs(value);       //sanitize value to prevent before use
        setEmail(sanitizedValue);   
      },[email]);

      //handling password input
      let handlePasswordInput=useCallback((e)=>
      {
        let value=e.target.value;
        let sanitizedValue=SanitizeInputs(value);      //sanitize value to prevent before use
        setPassword(sanitizedValue);
      },[password]);

     
    
    
    //proceed button for sign up click
    let handleProceedForSignUp=useCallback(()=>
    {
        //if email or password is invalid then it will return;
        if(invalidEmail || invalidPassword)
        {
            return;
        }
        let refferalCode=sessionStorage.getItem('ref');
        let obj={
            'login_value':email.toLowerCase(),
            'password':password,
            'referral_code':refferalCode
        };

        //for showing loading animation
            
        setLoadingAnimation(true);

        UserRegisterApi(obj)
        .then((response)=>{
            // console.log('response :',response);

            if(response&&'status' in response&&response.status==='success'&&'message' in response)
            {

                if(response.message==='Mail send successfully!')
                {
                    if(sessionStorage.getItem('ref'))
                    {
                        sessionStorage.removeItem('ref');
                    }

                    setRegisterSteps(1);
                }
                
                if(response.message==='User already exists but is not verified')
                {
                    setUserAlreadyRegistered(true);
                    setRegisterSteps(1);
                }
    
                if(response.message==='User already verified')
                {
                    setUserAlreadyVerified(true);
                }

            }
        })
        .catch((error)=>{
            console.error(error);
        })
        .finally(()=>{
                // for turn off loading animation 
                setLoadingAnimation(false);
        });
       
    },[invalidEmail,invalidPassword]);

     //proceed button for sign in click
    let handleProceedForSignIn=useCallback(()=>
    {
        //if email or password is invalid then it will return;
        setInvalidCredentials(invalidEmail || password.length<8);
        if(invalidEmail || password.length<8)
            {
                return;
            }

            let obj={
                'login_value':email,
                'password':password,
            };
            
            //for showing loading animation
            
            setLoadingAnimation(true);

            UserLogin(obj)
            .then((response)=>{
                // console.log('success response ',response);
                if(response&&'status' in response &&response.status==='success')
                {
                    if('message' in response&&response.message==='User is not present please register!')
                    {
                        setInvalidCredentials(true);
                        return;
                    }
                    // if user login intially or never veriefied his mobile number
                    if('data' in response&&'mobile_verified' in response&&!response?.mobile_verified)
                    {
                        window.location.href='/auth/mobile-verification';
                        
                    }
                    else if('data' in response&&'userdetails' in response&&!response?.userdetails)
                    {
                        window.location.href='/auth/user-information';

                    }
                   
                    if('message' in response&&response.message==='Please verify your email address.')
                    {   
                        setUserAlreadyRegistered(true);
                        setRegisterSteps(1);
                    }

                    if('error' in response && response?.error==='User not found')
                    {
                        setInvalidCredentials(true);
                        return;
                    }

                    if('message' in response&&response.message==='Logged in successfully.')
                        {
                          
                            router.push('/');
                        }
                }
                if('message' in response&&response.message==='Invalid credentials')
              {
                  setInvalidCredentials(true);
              }
            })
            .catch((error)=>{
                console.error(error);
                if('error' in error && error?.error==='User not found')
                    {
                        setInvalidCredentials(true);
                        return;
                    }
            })
            .finally(()=>{
                    // for turn off loading animation 
                    setLoadingAnimation(false);
            });
           
            
    },[]);


    //to sign in with google
    let handleSignInWithGoogle=useCallback(()=>
    {
        let url=process.env.BACKEND_ENDPOINT+'auth/google-login';
        router.push(url);
    },[]);

    //when someone hit enter in password
    let handlePasswordKeyDown=useCallback((e)=>
    {
        if(e.key==='Enter')
        {
            //if there is no login view and both email and passsword field are valid this condition for sign up
            if(!signInView&&!invalidPassword&&!invalidEmail)
            {
                handleProceedForSignUp();
            }
            else{
                //this condition is for sign in
                handleProceedForSignIn();
            }
        }
    },[signInView,invalidEmail,invalidPassword]);




     //getting access token
     function getAccessToken()
     {
         GetAccessTokenAPI()
         .then((response)=>{
             if(response&&'access_token' in response)
             {
                router.push('/store/home');
             }
         })
         .catch((error)=>{
            console.error(error);
            
         });
     }
    return (
        <>
           {registerSteps===0&&

                <div className="page-center-parent-container        ">
                    <div className={`w-full flex flex-col gap-8 px-6 pb-10 pt-14 background-custom-grey50 min-h-screen mt-auto duration-500 small-border border-black `} >
                        <div className="flex flex-col gap-2 items-center">
                            <h2 className="heading-h2 text-center custom-text-grey900">Welcome {signInView?'back':'to Payppy'}</h2>
                            <div className="body font-normal custom-text-grey700 text-center">{signInView?'Missed the Payppy vibes? We missed you, too!':'Sign up to our exclusive waitlist get a chance to access our next drop, first!'}</div>
                        </div>

                        <div className="flex flex-col gap-6 ">
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-center background-custom-white items-center gap-2 py-4 px-5 border-[0.5px] custom-border-grey800 relative  rounded-sm cursor-pointer duration-300 hover:bg-[#F3F1ED] " onClick={handleSignInWithGoogle} >
                                    <Image src={Google} width={20} height={20} alt='img' quality={100} className='absolute top-[50%] translate-y-[-50%] left-4' />
                                    <div className="all-caps-12-bold text-center custom-text-grey900 uppercase">Continue with Google</div>
                                    <div></div>
                                </div>
                              
                            </div>

                            {<div className={`flex flex-col gap-6 duration-500 `}>
                                
                                <div className="flex gap-2 items-center justify-center ">
                            
                                    <div className="small-border border-[#D7D4CF] grow"></div>
                                    <div className="custom-text-grey900 body">or</div>
                                    <div className="small-border border-[#D7D4CF] grow"></div>

                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <div className="all-caps-12-bold custom-text-grey900 uppercase">Email Address</div>
                                    <input type="text" name="email" value={email} className='w-full border-[0.5px] custom-border-grey800 outline-none py-3.5 px-5 ' onChange={handleEmailInput} ref={emailfield}/>
                                    {invalidEmail&&email.length>0&&<span className="custom-text-alert body-sm">Please enter a valid email address</span>}
                                </div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="all-caps-12-bold custom-text-grey900 uppercase">Password</div>
                                        <input type="password" name="password" value={password} className='w-full border-[0.5px] custom-border-grey800 outline-none py-3.5 px-5 ' onChange={handlePasswordInput} onKeyDown={handlePasswordKeyDown}/>
                                    {/* {invalidEmail&&email.length>0&&<span className="custom-text-alert body-sm">Please enter a valid email address</span>} */}

                                    </div>
                                 {!signInView&&<PasswordValidationBoxes password={password} />}
                                </div>

                               {signInView&&<Link href='/auth/reset-password' className='body-bold custom-text-grey800 underline pb-2.5'>Forgot Password?</Link>}

                                <div className="flex flex-col gap-2">
                                  {signInView?  <button className={`py-4 px-7 w-full flex justify-center items-center shadow-sm custom-text-white all-caps-12 text-center   bg-black `} onClick={handleProceedForSignIn}    disabled={loadingAnimation} >{loadingAnimation?<LoadingAnimation borderColor='border-white'/>:<span>Proceed</span>}</button>
                                    :<button className={`py-4 px-7 w-full flex justify-center items-center shadow-sm custom-text-white all-caps-12  text-center ${invalidPassword?' background-custom-grey500 ':'  bg-black '}`} onClick={handleProceedForSignUp} disabled={invalidPassword || invalidEmail}>{loadingAnimation?<LoadingAnimation borderColor='border-white'/>:<span>Proceed</span>}</button>}
                                   {userAlreadyVerified&& <span className="custom-text-alert body-sm text-center">An account with this email already exists. Please log in</span>}
                                   {invalidCredentails&& <span className="custom-text-alert body-sm text-center">invalid Credentials</span>}

                                </div>

                               {signInView ? <div className="flex gap-2 justify-center ">
                                                <div className="custom-text-grey700 body"> Not a Member?  </div>
                                                <Link href='/auth/user-auth' className='body-bold custom-text-grey800 underline pb-2.5'>Sign Up</Link>
                                            </div>
                                        :  <div className="flex gap-2 justify-center ">
                                                <div className="custom-text-grey700 body">Already a member? </div>
                                                <Link href='/auth/user-auth?auth=login' className='body-bold custom-text-grey800 underline pb-2.5'>Log in</Link>
                                            </div>}
                            </div>}
                        </div>
                    </div>
                </div>}

           {registerSteps===1&& <SignUpByEmail email={email} alreadyRegistered={userAlreadyRegistered} setRegisterSteps={setRegisterSteps}/>
            }
        </>
    );
}

export default UserAuthPageSection;

