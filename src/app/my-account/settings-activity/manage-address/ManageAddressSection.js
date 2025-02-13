'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


//components
import IntialLoadingAnimation from '@/Components/InitialPageLoadingAnimation';
import ManageAddress from '@/Components/ManageAddressModal';

//images
import CloseIcon from '@/Images/Icons/close-icon-new.svg';
import CheckGrey from '@/Images/Icons/check-grey.svg';

//API
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import CreateCartApi from '@/apis/store/CreateCartApi';
import GetCartInfoApi from '@/apis/store/GetCartInfoApi';
import GetAddressApi from '@/apis/store/GetAddressApi';



const ManageAddressSection = () => {


    let[showModal,setShowModal]=useState(false);
    let [accessToken, setAccessToken] = useState('');
    let [gettingAccessToken, setGettingAccessToken] = useState(true);
    let[cartInfo,setCartInfo]=useState('');
    let[userAddress,setUserAddress]=useState('');


    let router=useRouter();

     //to get a access token
     useEffect(() => {
        getAccessToken();
    }, []);


    useEffect(()=>{
        if(accessToken)
        {
            getCartInfo();
        }
    },[accessToken]);

    useEffect(()=>{
        if(cartInfo)
        {
            getAddress();
        }
    },[cartInfo]);


      //getting access token
      function getAccessToken() {
        setGettingAccessToken(true);
        GetAccessTokenAPI()
            .then((response) => {
                if (response && 'access_token' in response) {
                    setAccessToken(response.access_token);
                }

                if(response&&'message' in response&&response.message==='Refresh token is missing')
                {
                    router.push('/auth/user-auth');
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

         if(response&&'cart_id' in response)
         {
             setCartInfo(response);
         }
     })
     .catch((error)=>{
         console.error(error);
     });
 }

    let getAddress=useCallback(()=>
    {
       GetAddressApi(accessToken)
       .then((response)=>{
           if(response&&'response' in response&&response?.response&&'addresses' in response.response)
           {
                   let length=response?.response.addresses.length-1;
                   setUserAddress(response?.response?.addresses);

                   let Addresses=response?.response?.addresses[length];
                   //removing unwanted properties
                   delete Addresses?.company;
                   delete Addresses?.address_2;
                   delete Addresses?.metadata;
                   delete Addresses?.created_at;
                   delete Addresses?.updated_at;
                   delete Addresses?.customer_id;
                   delete Addresses?.id;


                   let billingAddresses =Addresses;
                   let shipping_address=Addresses;
                 

                  

                   let createCartObj={
                       "billing_address": billingAddresses,
                       "shipping_address": shipping_address
                   };

                   CreateCartApi(createCartObj,cartInfo.cart_id)
                   .then(()=>{
                   })
                   .catch((error)=>{
                       console.error(error);
                   });
                   
           }
       });
    },[]);

    let handleAddressModal=useCallback(()=>
    {
            setShowModal(!showModal);
    },[showModal]);

    let handleBackBtn=useCallback(()=>
    {
        router.push('/my-account/settings-activity');
    },[]);


    if(gettingAccessToken)
        {
            return(<IntialLoadingAnimation/>);
        }
    return (

        <>
            {accessToken &&
                <div className={"flex justify-center  w-full background-custom-grey50    "}>
                    <div className="page-center-parent-container vh100 small-border custom-border-grey600  overflow-scrollbar-hidden flex flex-col gap-5 relative">
                        <button className="py-3 px-4" onClick={handleBackBtn}>
                            <Image src={CloseIcon} width={24} height={24} alt='img' quality={100} className='' />
                        </button>
                        <section className="flex flex-col gap-8 px-6">
                            <h4 className="heading-h4 custom-text-grey900">Manage addresses</h4>
                            {userAddress?.length>0?
                            <div className="flex flex-col gap-3">
                                <div className="all-caps-12 custom-text-grey700">Shipping Address</div>
                                <div className="body-bold custom-text-grey900">{userAddress[userAddress.length-1]?.address_1 || ""}<br />
                                {userAddress[userAddress.length-1]?.city || ""}, {userAddress[userAddress.length-1]?.province || ""}, {userAddress[userAddress.length-1]?.postal_code || ""}</div>
                                <div className="flex items-center gap-1">
                                    <Image src={CheckGrey} width={12} height={12} alt='' quality={100} className='' />
                                    <div className="body-sm custom-text-grey600">Same for billing</div>
                                </div>
                            </div>:
                            <div className="all-caps-10 custom-text-grey800">No Addresses found</div>
                        }
                            <button className={`py-4 px-7 w-full flex justify-center items-center shadow-sm  all-caps-12 text-center small-border  ${userAddress?.length>0 ? ' border-black ':' custom-text-white bg-black  '} `} onClick={handleAddressModal}>{userAddress?.length>0 ? 'Edit Address':'Add Address'}</button>
                        </section>

                    <ManageAddress showModal={showModal} setShowModal={setShowModal} userInfo={cartInfo} accessToken={accessToken} getAddress={getAddress}  />

                    </div>
                </div>}
        </>

    );
};

export default ManageAddressSection;