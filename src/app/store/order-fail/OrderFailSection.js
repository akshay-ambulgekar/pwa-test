'use client';

import Image from 'next/image';
//images
import CloseIcon from '@/Images/Store/close-icon.svg';
import AlertCircle from '@/Images/Store/alert-circle.svg';
import { useCallback, useEffect, useState } from 'react';
import GetCartInfoApi from '@/apis/store/GetCartInfoApi';
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import IntialLoadingAnimation from '@/Components/InitialPageLoadingAnimation';
import GetCartItemsApi from '@/apis/store/GetCartItemsApi';
import { useRouter } from 'next/navigation';

import { useRazorpay } from "react-razorpay";
import DeleteCartIdApi from '@/apis/store/DeleteCartIdApi';
import GenerateOrderApi from '@/apis/store/GenerateOrderApi';
import { useSearchParams } from 'next/navigation';


function OrderFailSection() {

    let[accessToken,setAccessToken]=useState('');
    let[gettingAccessToken,setGettingAccessToken]=useState(true);

    let[cartInfo,setCartInfo]=useState('');
    let[cartPrice,setCartPrice]=useState('');

    let[orderId,setOrderId]=useState('');

    let params=useSearchParams();



    const { Razorpay } = useRazorpay();


    let router=useRouter();

    useEffect(()=>{
        let orderParamsId=params.get('url');
        if(orderParamsId)
        {
            setOrderId(orderParamsId);  
        }
    },[]);
     //to get a access token
     useEffect(()=>{
        getAccessToken();
    },[]);

    useEffect(()=>{
        if(accessToken)
        {
            getCartInfo();
        }
    },[accessToken]);

    useEffect(()=>{
        if(cartInfo)
        {
            getAmount();
        }
    },[cartInfo]);


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


     //get cart amount 
     function getAmount()
     {
        GetCartItemsApi(cartInfo.cart_id)
        .then((response)=>{
            if(response&&'cart' in response)
            {
                setCartPrice(response?.cart?.total);
            }
        })
        .catch();
     }


     let handleProceedToPay=useCallback(()=>
     {
        try {
            if(!cartInfo || !cartPrice)
            {
                return;
            }
        const options = {
            key: process.env.RAZORPAY_KEY, // Replace with Razorpay Test/Live Key ID
            amount: cartPrice, // Amount from Razorpay Order
            currency: 'INR', // Currency from Razorpay Order
            order_id: orderId, // Razorpay Order ID
            name: cartInfo?.details_data?.first_name,
            // callback_url: `https://medusa.payppy.in/razorpay/hooks`,
            description: 'Payment for product',
            // image: '/your-logo.png', // Optional logo
            handler: (response) => {
              // Handle successful payment here
            if(response&&'razorpay_payment_id' in response)
            {
                //if payment sucessfull then first generate the order id from medusa 
                GenerateOrderApi(cartInfo.cart_id)
                .then((response)=>{
                  if(response&&'order' in response)
                  {

                    //then delete the cart id that has been used 
                    DeleteCartIdApi(accessToken)
                    .then()
                    .catch()
                    .finally(()=>{
                        router.push('/store/order-complete?url='+response?.order.id);
                    });
                  }
                  
                })
                .catch((error)=>{
                  console.error(error);
                });
            }
            },
            "prefill": {
              "name": cartInfo?.details_data?.first_name, // Customer's name
              "email": cartInfo?.email, // Customer's email
              "contact": cartInfo?.details_data?.phone_number, // Customer's phone
            },
            theme: {
              color: '#3399cc', // Optional custom theme color
            },
          };
    
          const razorpayInstance = new Razorpay(options);
          razorpayInstance.open();

          // Handling Razorpay errors
            razorpayInstance.on('payment.failed', function (response) {
                console.error('Payment failed:', response.error);
                // alert('Payment failed. Please try again or contact support.');
            });

        } catch (error) {
            console.error(error);
             
        }
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
                            <Image src={AlertCircle} width={32} height={32} alt="img" quality={100} className="" />
                            <div className="flex flex-col gap-2 items-center">
                                <h4 className="heading-h4 custom-text-grey900 text-center   ">Payment Failed</h4>
                                <div className="custom-text-grey900 text-center  body-sm">Your payment for this order could not be completed. Please retry the payment. If money was deducted from your card/bank account, it would be refunded in 2-3 business days</div>
                            </div>
                            <button className="custom-text-white bg-black py-3 px-6 all-caps-10-bold" onClick={handleProceedToPay}>Retry Payment</button>
                        </div>
                    </div>
                </div>


                </div>
            </section>}
        </>
    );
}

export default OrderFailSection;

