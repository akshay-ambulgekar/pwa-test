'use client';
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

//icons
import HomeLight from "@/Images/Icons/home-icon-light.svg";
import HomeDark from "@/Images/Icons/home-icon-dark.svg";
import FlixLight from "@/Images/Icons/flix-icon-light.svg";
import FlixDark from "@/Images/Icons/flix-icon-dark.svg";
import BillLight from "@/Images/Icons/bill-icon-light.svg";
import BillDark from "@/Images/Icons/bill-icon-dark.svg";
import BagLight from "@/Images/Icons/bag-icon-light.svg";
import BagDark from "@/Images/Icons/bag-icon-dark.svg";
import AccountLight from "@/Images/Icons/account-icon-light.svg";
import AccountDark from "@/Images/Icons/account-icon-dark.svg";
import { usePathname } from "next/navigation";
import GetAccessTokenAPI from "@/apis/auth/GetAccessToken";
import GetCartInfoApi from "@/apis/store/GetCartInfoApi";
import GetCartItemsApi from "@/apis/store/GetCartItemsApi";
import BillPayModal from "./BillPayModal";



const StoreFooter = () => {

  let[accessToken,setAccessToken]=useState('');

  let[cartid,setCartId]=useState('');

  let[cartItems,setCartItems]=useState([]);

  let[showModal,setShowModal]=useState(false);

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
      if(cartid)
      {
          getCartItems();
      }
  },[cartid]);

   //getting access token
   function getAccessToken()
   {
       GetAccessTokenAPI()
       .then((response)=>{
          //  console.log(response);
           if(response&&'access_token' in response)
           {
               setAccessToken(response.access_token);
           }
       })
       .catch((error)=>{
        console.error(error);
       });

   }

   //get cart information from api
   function getCartInfo()
   {
       GetCartInfoApi(accessToken)
       .then((response)=>{

           if(response&&'cart_id' in response)
           {
               setCartId(response.cart_id);
           }
       })
       .catch((error)=>{
           console.error(error);
       });
   }

   //get cart items
   function getCartItems()
   {
      GetCartItemsApi(cartid)
      .then((response)=>{
          setCartItems(response.cart);

      })
      .catch((error)=>{
          console.error(error);
      });
   }
  let pathname=usePathname();

  //show bill pay modal
  let showBillPayModal=useCallback(()=>
  {
    setShowModal(true);
  },[showModal]);
  
  return (
    <footer className="sticky bg-store-footer-gradient py-5 z-[5]  bottom-0 flex justify-center items-center">
      <div className="flex items-center max-w-64 w-full gap-6 py-3 px-5 small-border border-black rounded-full  background-custom-grey50 z-[5]">
        <Link className="  " href="/">
         <Image src={(pathname==='/store/home' || pathname==='/')?HomeDark:HomeLight} width={24} height={24} alt="img" quality={100} className="w-6 h-6 max-h-none" />
        </Link>
        

        <Link className="  " href="/flix">
         <Image src={pathname.includes('/flix') ? FlixDark : FlixLight} width={24} height={24} alt="img" quality={100} className="w-6 h-6 max-h-none"/>
        </Link>

        <button onClick={showBillPayModal}>
         <Image src={showModal ? BillDark : BillLight} width={24} height={24} alt="img" quality={100} className="w-6 h-6 max-h-none"/>
        </button>

        <Link  href="/store/shopping-bag" className="relative   ">
           <Image src={pathname.includes('/shopping-bag')? BagDark : BagLight} width={24} height={24} alt="img" quality={100} className="w-6 h-6 max-h-none"/>
          {cartItems?.items?.length > 0&& <div className="w-2 h-2 small-border border-black background-custom-green rounded-full absolute top-0.5 right-0"></div>}
        </Link>

        <Link className="  " href="/my-account">
          <Image src={pathname.includes('/my-account')?AccountDark:AccountLight} width={24} height={24} alt="img" quality={100} className="w-6 h-6 max-h-none"/>
        </Link>
      </div>

      <BillPayModal showModal={showModal} setShowModal={setShowModal} />

    </footer>
  );
};

export default StoreFooter;
