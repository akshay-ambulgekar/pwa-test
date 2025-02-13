'use client';
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

//header images

import Hero from '@/Images/LandingPage/home-image.jpg';

import Logo from '@/Images/LandingPage/logo-mark-white.svg';
import Logout from '@/Images/LandingPage/logout-icon.svg';


//section images
import Bill from '@/Images/LandingPage/bills-icon.svg';
import Gift from '@/Images/LandingPage/gift-icon.svg';
import Shpping from '@/Images/LandingPage/shopping-icon.svg';
import More from '@/Images/LandingPage/more-icon.svg';

//footer
import Twitter from '@/Images/LandingPage/twitter.svg';
import Insta from '@/Images/LandingPage/insta.svg';



//to prevent generate static page
export const dynamic='auto';


import GetAccessTokenAPI from "@/apis/auth/GetAccessToken";
import IntialLoadingAnimation from "@/Components/InitialPageLoadingAnimation";
import GetAuthInfoApi from "@/apis/auth/GetAuthInfoApi";
import LogoutApi from "@/apis/auth/LogoutApi";
import Link from "next/link";


function LandingPageSection()
{
    
    let[accessToken,setAccessToken]=useState('');
    let[gettingAccessToken,setGettingAccessToken]=useState(true);
    let[userName,setUserName]=useState('');


    let router=useRouter();


  
    //to get a access token
    useEffect(()=>{
        getAccessToken();
    },[]);

    useEffect(()=>{
        getUserInfo();
    },[accessToken]);
   

    function getUserInfo()
    {
        GetAuthInfoApi(accessToken)
        .then((response)=>{
            
            if('first_name' in response)
            {
                setUserName(response.first_name);
            }

            // if('error' in response&&response.error==='User details not found')
            // {
            //     router.push('/store/user-info');
            // }
        })
        .catch((error)=>{
            console.error(error);
        });
    }
    //getting access token
    function getAccessToken()
    {
        GetAccessTokenAPI()
        .then((response)=>{

            if (response && 'message' in response && response.message === 'Refresh token is missing!') {
                window.location.href = '/auth/user-auth';
            }
            if ('access_token' in response) {
                setAccessToken(response.access_token);
            }

        })
        .catch(()=>{

        })
        .finally();
        {
            setGettingAccessToken(false);
        }
    }


    //when user click logout
    let handleLogOut=useCallback(()=>
    {
        LogoutApi(accessToken)
        .then((response)=>{
            if(response&&'message' in response&&response.message==='Logged out successfully.')
            {
                router.push('/');
            }
        })
        .catch((error)=>{
            console.error(error);
            
        });
    },[accessToken]);
  
    let handleFashionBlogClick=useCallback(()=>
    {
        router.push('/flix');
    },[]);
    return(
        <>
           {gettingAccessToken ? <IntialLoadingAnimation/> 
           :

                <div className="page-center-parent-container overflow-scroll h-full  overflow-scrollbar-hidden small-border-x custom-border-grey800 background-custom-grey50  relative " >
                    {/* hero section */}


                        <div className=" h-[440px]  flex flex-col justify-between items-center  relative w-full overflow-hidden " >
                           <button className="absolute top-5 right-5  z-[2] cursor-pointer" onClick={handleLogOut}>
                           <    Image src={Logout} width={20} height={20} alt="" quality={100} className=" "  />
                            </button> 
                            <Image src={Hero} width={390} height={440} alt="" quality={100} className="w-full  object-cover " />
                            <div className="bg-landingpage-gradient absolute top-0 left-0  w-full h-full "></div>
                            <div className="flex flex-col h-full absolute justify-between items-center z-[1] px-10   py-10 ">
                                <Image src={Logo} width={32} height={32} alt="img" quality={100} className=" " />
                                <div className="flex flex-col gap-2 items-center   ">
                                    <h2 className="heading-h2 custom-text-white text-center">Welcome {userName}! </h2>
                                    <div className="all-caps-14-bold custom-text-white">Payppy 2.0 is launching soon...</div>
                                </div>
                            </div>
                        </div>
                    
                    <div className="grid grid-cols-2  ">
                        <div className="small-border-bottom border-black py-8 px-6 flex flex-col gap-2 items-center">
                            <Image src={Bill} width={32} height={32} alt="img" quality={100} className="" />
                            <div className="all-caps-12-bold text-center">Bill Payments</div>
                            <div className="body-sm custom-text-grey800 text-center max-w-[96px] w-full ">Pay all your bills on Payppy</div>
                        </div>
                        <div className="small-border-bottom small-border-left border-black py-8 px-6 flex flex-col gap-2 items-center">
                            <Image src={Gift} width={32} height={32} alt="img" quality={100} className="" />
                            <div className="all-caps-12-bold text-center">Gift cards</div>
                            <div className="body-sm custom-text-grey800 text-center">Rewards from your favourite brands</div>

                        </div>
                        <div className="small-border-bottom border-black py-8 px-6 flex flex-col gap-2 items-center">
                            <Image src={Shpping} width={32} height={32} alt="img" quality={100} className="" />
                            <div className="all-caps-12-bold text-center">Shopping</div>
                            <div className="body-sm custom-text-grey800 text-center">Fashion and accessories that drop jaws</div>
                        </div>
                        <div className="small-border-bottom small-border-left border-black py-8 px-6 flex flex-col gap-2 items-center">
                            <Image src={More} width={32} height={32} alt="img" quality={100} className="" />
                            <div className="all-caps-12-bold text-center">...and more</div>
                            <div className="body-sm custom-text-grey800 text-center max-w-[96px] w-full">Wait and watch this space</div>
                        </div>

                    </div>

                    <button className="background-custom-green all-caps-12-bold custom-text-grey900 w-full text-center py-4" onClick={handleFashionBlogClick}>EXPLORE FASHION BLOGS</button>

                    <div className="flex flex-col justify-center gap-5 items-center z-[1] background-custom-grey50 py-7 px-6 small-border-top border-black">
                            <div className="flex items-center gap-5">

                               <a href="https://x.com/payppy_app?s=21" target="_blank" rel="noopener noreferrer">
                                    <Image src={Twitter} width={16} height={16} alt='img' quality={100} className='' />
                               </a>


                               <a href="https://www.instagram.com/payppy.app/" target="_blank" rel="noopener noreferrer">
                                    <Image src={Insta} width={16} height={16} alt='img' quality={100} className='' />
                               </a>
                                {/* </Link> */}
                            </div>
                            <div className="flex items-center gap-5 ">
                                <Link href='/shipping-return-refund' className='all-caps-10 custom-text-grey900'>ShippinG</Link>
                                <Link href='/terms-of-use' className='all-caps-10 custom-text-grey900'>terms</Link>
                                <Link href='/cookies-policy' className='all-caps-10 custom-text-grey900'>cookies</Link>
                                <Link href='/privacy-policy' className='all-caps-10 custom-text-grey900'>privacy</Link>
                            </div>
                    </div> 


                </div>

           }
        </>
    );
} 

export default LandingPageSection;