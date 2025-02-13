'use client';
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";



//components
import AccountButton from "@/Components/AccountButton";
import AccountCopyrightSection from "@/Components/AccountCopyrightSection";
import StoreFooter from '@/Components/StoreFooter';
import IntialLoadingAnimation from "@/Components/InitialPageLoadingAnimation";

//icons
import orderIcon from "@/Images/Icons/order-icon.svg";
import settingIcon from "@/Images/Icons/setting-icon.svg";
import helpIcon from "@/Images/Icons/help-icon.svg";
import policyIcon from "@/Images/Icons/policy-icon.svg";

// Apis 
import GetAccessTokenAPI from "@/apis/auth/GetAccessToken";
import LogoutApi from "@/apis/auth/LogoutApi";
import GetCartInfoApi from "@/apis/store/GetCartInfoApi";



const MyAccountSection = () => {

  let[accessToken,setAccessToken]=useState('');
  let[userInfo,setUserInfo]=useState('');
  let[gettingAccessToken,setGettingAccessToken]=useState(true);

  let router=useRouter();

  useEffect(()=>{
    getAccessToken();
  },[]);
  useEffect(()=>{
    if(accessToken)
    {
      getCartInfo();
    }
  },[accessToken]);

  //getting access token
  function getAccessToken()
  {
    setGettingAccessToken(true);
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

   //get user information from api
   function getCartInfo()
   {
       GetCartInfoApi(accessToken)
       .then((response)=>{
           if(response)
           {
            setUserInfo(response);
           }
       })
       .catch((error)=>{
           console.error(error);
       });
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

  //if click on login/signup button
  let handleLoginSignupClick=useCallback(()=> {
    router.push('/auth/user-auth');
  },[]);
  return (
    <>
    {gettingAccessToken?<IntialLoadingAnimation/>
      :
      <article className="page-center-parent-container min-h-[100dvh] small-border-x border-black  scroll-smooth relative ">
       {/* hero section */}
        <header className={"small-border-bottom custom-border-grey800  "}>
            <div className="gap-6 mt-4 mx-4 rounded-tl-xl rounded-tr-xl small-border-top small-border-right small-border-left custom-border-grey800 min-h-[235px] flex justify-center items-center bg-account-user-hero-gradient  ">
              
              {/* User Section */}
             {!accessToken? <section className="gap-6 flex flex-col items-center py-12 px-5">
                <div className="gap-2 flex flex-col items-center max-w-60 w-full">
                    <h2 className={"heading-h2 custom-text-white text-center "}>Welcome to Payppy Membership!</h2>
                    <div className="custom-text-white text-center body font-normal">From sensible rewards to irresistible collections, cool things await you on this side of the world.</div>
                </div>
                <button className="background-custom-green all-caps-12-bold custom-text-grey900 text-center py-4 small-border border-black max-w-[156px] w-full " onClick={handleLoginSignupClick} >Login/SignuP</button>

              </section>
              :
              <section className="gap-2 flex flex-col items-center ">
                  <h2 className="heading-h2 custom-text-white ">
                  {(userInfo?.details_data?.first_name || "")  + " "+ (userInfo?.details_data?.last_name || "")  }
                  </h2>

                  <div className="flex items-center justify-center pt-1">
                    <div className=" h-[1px] w-2 background-custom-grey600 mr-1 "></div>
                    <p className="all-caps-10-bold custom-text-grey500">
                      WELCOME TIER
                    </p>
                    <div className=" h-[1px] w-2 background-custom-grey600 ml-1 "></div>
                  </div>
              </section>}
            </div>
        </header>

        {/* main section */}
        <main className=" flex flex-col items-center w-full">
         {accessToken&& <>
            <AccountButton href="/my-account/orders" buttonIcon={orderIcon} buttonName="my orders" />
            <AccountButton href="/my-account/settings-activity" buttonIcon={settingIcon} buttonName="Settings & Activity" />
          </>}
          <AccountButton href="/my-account/help" buttonIcon={helpIcon} buttonName="Help & Support"  />
          <AccountButton href="/my-account/legal" buttonIcon={policyIcon} buttonName="Legal Policies & More" />
        </main>

        {/* footer section */}
        <footer className=" gap-10 pt-12 px-6 pb-10 flex flex-col items-center w-full ">
    
          <AccountCopyrightSection />
         
         {accessToken&& <button type="button" className=" py-3 px-6 small-border custom-border-grey800 all-caps-10-bold custom-text-grey900 w-full" onClick={handleLogOut}>
            Logout
          </button>}


        </footer>
          <StoreFooter/>

      </article>
    }
    </>
  );
};

export default MyAccountSection;
