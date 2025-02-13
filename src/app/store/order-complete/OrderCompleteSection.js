'use client';

import Image from 'next/image';

//images
import CloseIcon from '@/Images/Store/close-icon.svg';
import OrderSuccess from '@/Images/Store/order-success.svg';
import { useCallback, useEffect, useState } from 'react';
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import IntialLoadingAnimation from '@/Components/InitialPageLoadingAnimation';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';


function OrderCompleteSection() {

    let[accessToken,setAccessToken]=useState('');
    let[gettingAccessToken,setGettingAccessToken]=useState(true);
    let[parameterOrderId,setParameterOrderId]=useState('');

    let params=useSearchParams();

    let router=useRouter();
     //to get a access token
     useEffect(()=>{
        getAccessToken();
    },[]);

    useEffect(()=>{
       let orderId= params.get('url');
       if(orderId)
       {
        setParameterOrderId(orderId);
       }
    },[params]);

   

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
         .catch(()=>{
 
         })
         .finally();
         {
             setGettingAccessToken(false);
         }
     }
 
    


     let handleRouterClick=useCallback(()=>
    {
        router.push('/my-account/orders/'+parameterOrderId);
    },[]);
    
     let handlebackClick=useCallback(()=>
     {
         router.push('/');
     },[]);
    return (
        <>
          {  gettingAccessToken || !accessToken? <IntialLoadingAnimation/>
            :<section className={"flex justify-center min-h-screen w-full background-custom-grey50    " }>
                <div className="page-center-parent-container  small-border custom-border-grey600 overflow-y-scroll overflow-scrollbar-hidden  relative">

                    
                    <button onClick={handlebackClick} className='py-3 px-4'>     
                        <Image src={CloseIcon} width={20} height={20} alt="img" quality={100} className="" />
                    </button>
                <div className="flex flex-col justify-center items-center h-full ">
                    <div className="flex flex-col gap-5 items-center max-w-60 w-full">
                        <div className="flex flex-col gap-5 items-center">
                            <Image src={OrderSuccess} width={88} height={80} alt="img" quality={100} className="" />
                            <div className="flex flex-col gap-2 items-center">
                                <h4 className="heading-h4 custom-text-grey900 text-center   ">Your order has been placed</h4>
                                <div className="custom-text-grey900 text-center  body-sm">We&apos;ve received your order, and your parcel will soon be on it&apos;s way!</div>
                            </div>
                        </div>
                        <button className="custom-text-grey800 body-sm-bold underline" onClick={handleRouterClick}>Order Details</button>
                    </div>
                </div>


                </div>
            </section>}
        </>
    );
}

export default OrderCompleteSection;

