'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


//components
import PageBackButton from '@/Components/PageBackButton';
import AccountButton from '@/Components/AccountButton';
import ReadFaqSection from '@/Components/ReadFaqSection';
import IntialLoadingAnimation from '@/Components/InitialPageLoadingAnimation';

//API
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import LogoutApi from '@/apis/auth/LogoutApi';
import GetCartInfoApi from '@/apis/store/GetCartInfoApi';


const SettingsAndActivitySection = () => {

    let [accessToken, setAccessToken] = useState('');
    let [gettingAccessToken, setGettingAccessToken] = useState(true);
    let[cartInfo,setCartInfo]=useState('');

    let router=useRouter();

     //to get a access token
     useEffect(() => {
        getAccessToken();
    }, []);

    //to hit cart info if user logged in 
    useEffect(()=>{
        if(accessToken)
        {
            getCartInfo();
        }
    },[accessToken]);

      //getting access token
      function getAccessToken() {
        setGettingAccessToken(true);
        GetAccessTokenAPI()
            .then((response) => {
                if(response&&'message' in response&&response.message==='Refresh token is missing')
                {
                    router.push('/auth/user-auth');
                }
                if (response && 'access_token' in response) {
                    setAccessToken(response.access_token);
                }

            })
            .catch(() => {

            })
            .finally();
        {
            setGettingAccessToken(false);
        }
    }

     //get cart information from api
     function getCartInfo()
     {
         GetCartInfoApi(accessToken)
         .then((response)=>{
             if(response&&'details_data' in response)
             {
                setCartInfo(response);
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
  },[]);

    if(gettingAccessToken)
    {
        return(<IntialLoadingAnimation/>);
    }

    return (

        <>
     {accessToken && 
        <article className={"page-center-parent-container h-[100dvh] border-r-[0.5px] border-l-[0.5px] custom-border-grey950 overflow-x-hidden overflow-y-visible scroll-smooth " }>
            
            <PageBackButton url='/my-account'/>

            <main className='gap-10 mt-5 border-t-[0.5px] custom-border-grey800'>
                <AccountButton href="/my-account/settings-activity/personal-info" buttonName="Personal Information" />
               {!cartInfo?.details_data?.is_sso&& <AccountButton href="/my-account/settings-activity/change-password" buttonName="Change Password" />}
                <AccountButton href="/my-account/settings-activity/manage-address" buttonName="Address Book" />
                <AccountButton href="#" buttonName="Saved" />

                {/* logout button */}
                <div className='mt-10 mx-6'>
                    <button onClick={handleLogOut} className='w-full border-[0.5px] custom-border-grey800 py-3 px-6 all-caps-10-bold custom-text-grey900 ' type='button'>
                        Logout
                    </button>
                </div>

            </main>

            <footer className=' w-full'>
                <ReadFaqSection />
            </footer>

        </article>}
        </>

    );
};

export default SettingsAndActivitySection;