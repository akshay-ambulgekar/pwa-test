'use client';
import StoreShopPepoinNavbar from '@/Components/StoreShopPepoinNavbar';

import Image from 'next/image';
//images
import CloseIcon from '@/Images/Store/close-icon.svg';
import ChevronUp from '@/Images/Store/chevron-up.svg';
import { useCallback, useEffect, useState } from 'react';
import GetCartInfoApi from '@/apis/store/GetCartInfoApi';
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import IntialLoadingAnimation from '@/Components/InitialPageLoadingAnimation';
import GetCartItemsApi from '@/apis/store/GetCartItemsApi';
import RemoveProductFromCartApi from '@/apis/store/RemoveProductFromCartApi';
import { useRouter } from 'next/navigation';
import ShppingBagMyFavouritesButtons from '@/Components/ShppingBagMyFavouritesButtons';
import CartEmptyViewComponent from '@/Components/CartEmptyViewComponent';
import DashedBorder from '@/Components/DashedBorder';




function ShoppingBagSection() {

    let[accessToken,setAccessToken]=useState('');
    let[gettingAccessToken,setGettingAccessToken]=useState(true);

    let[cartid,setCartId]=useState('');

    let[showDetails,setShowDetails]=useState(false);


    let[cartItems,setCartItems]=useState([]);
    let[notEligibleForCheckout,setNotEligibleForCheckout]=useState(true);


    let router=useRouter();
     //to get a access token
     useEffect(()=>{
        getAccessToken();
    },[]);

    useEffect(()=>{
        if(accessToken)
        {
            getCartInfo();
        }
        
        if(!accessToken&&!gettingAccessToken){
            window.location.href='/auth/user-auth';
        }
    },[accessToken,gettingAccessToken]);

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
            //  console.error(response);
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
            window.location.href='/auth/user-auth';
         })
         .finally(()=>{
            setGettingAccessToken(false);
         });
         
     }
 
     //get cart information from api
     let getCartInfo=useCallback(()=>
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
     },[]);

     //get cart items
     let getCartItems=useCallback(()=>
     {
        GetCartItemsApi(cartid)
        .then((response)=>{
            // console.error(response);
            setCartItems(response.cart);

            
            setNotEligibleForCheckout(response?.cart?.items?.length<1);

        })
        .catch((error)=>{
            console.error(error);
        });
     },[]);

     //to substract the quantity of product
    //  function handleSubstractCount(lineId,quantity)
    //  {
    //     if(quantity===1)
    //     {
    //         return;
    //     } 
    //     let obj={
    //         'quantity':quantity-1
    //     }
    //     UpdateProductQuantityApi(cartid,lineId,obj)
    //     .then((response)=>{
    //         console.error(response);
    //         setCartItems(response?.cart);
    //     })
    //     .catch((error)=>{

    //     })
    //  }

     //to add the quantity of product
    //  function handleAddCount(lineId,quantity)
    //  {
    //     let obj={
    //         'quantity':quantity+1
    //     }
    //     UpdateProductQuantityApi(cartid,lineId,obj)
    //     .then((response)=>{
    //         // console.error(response);
    //         setCartItems(response?.cart);
    //     })
    //     .catch((error)=>{

    //     })
    //  }

     //to remove product from cart
     function handleRemoveProduct(e,lineId)
     {
        e.stopPropagation();

        RemoveProductFromCartApi(cartid,lineId)
        .then((response)=>{
            // console.error(response);
            // setCartItems(response?.cart);
            if(response&&'deleted' in response&&response.deleted===true)
            {
                getCartItems();
            }
        })
        .catch((error)=>{
            console.error(error);
        });
     }

     //if user click on entire product
     function handleCartProductClick(id)
     {
        router.push('/store/product?product='+id);
     }

     //if user click on collection name 
     function handleCollectionButtonClick(e,collectionId)
     {
        e.stopPropagation();
        
        router.push('/store/brand-page?collection='+collectionId);
     }
     let handleSecureCheckout=useCallback(()=>
     {
        router.push('/store/checkout');
     },[]);


     let toggleDetails=useCallback(()=>{
        setShowDetails(!showDetails);
     },[]);
    
    return (
        <>
            {gettingAccessToken  ? <IntialLoadingAnimation />
                :  accessToken&&
                <section className="flex justify-center min-h-dvh w-full background-custom-grey50    " >
                    <div className="page-center-parent-container min-h-dvh small-border custom-border-grey600 overflow-y-scroll overflow-scrollbar-hidden flex flex-col justify-between relative">
                        <div>

                            <StoreShopPepoinNavbar pepcoin={true} backclickurl='/store/home' isItemsPresentInCart={cartItems?.items?.length > 0} accessToken={accessToken}  />

                            {/* shopping bag & my Favourites catagory buttons */}
                            <ShppingBagMyFavouritesButtons shoppingBagCount={(cartItems?.items?.length || 0)}/>

                            {/* shoppping bag product info  section */}
                            {/* eslint-disable react/jsx-no-bind */}
                            {cartItems?.items?.length > 0 ? cartItems.items.map((element, index) => {
                                return <div key={index} className="grid grid-cols-2 small-border-bottom custom-border-grey800 cursor-pointer" onClick={()=>{handleCartProductClick(element?.product?.id);}}>
                                    <Image src={element.thumbnail} width={195} height={292} alt="img" quality={100} className=" w-full h-auto object-cover small-border-right custom-border-grey800" />

                                    <div className="flex flex-col justify-between p-4 pr-3 ">

                                        <div className="flex flex-col gap-4">
                                            <div className="flex justify-end w-full ">
                                                <button onClick={(e) => { handleRemoveProduct(e,element?.id); }}>   
                                                    <Image src={CloseIcon} width={20} height={20} alt="img" quality={100} className="" />
                                                </button>
                                            </div>

                                            <button className="all-caps-10 custom-text-grey600 w-full text-left" onClick={(e)=>{handleCollectionButtonClick(e,element?.product?.collection_id);}}>by {element?.product_collection}</button>

                                            <div className="all-caps-10-bold custom-text-grey900">{element?.product_title}</div>

                                            <div className="all-caps-12-bold custom-text-grey800">₹{element?.unit_price}</div>

                                        </div>

                                        {/* <div className="flex items-center gap-1">
                                    <Image src={Minus} width={20} height={20} alt="img" quality={100} className="cursor-pointer" onClick={()=>{handleSubstractCount(element?.id,element?.quantity)}}/>
                                    <div className="all-caps-12-bold custom-text-grey900">{element?.quantity}</div>
                                    <Image src={Plus} width={20} height={20} alt="img" quality={100} className="cursor-pointer" onClick={()=>{handleAddCount(element?.id,element?.quantity)}}/>
                                </div> */}

                                        <div className="flex justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="custom-text-grey900 body-sm">{element?.title}</div>
                                            </div>

                                        </div>
                                    </div>
                                </div>;
                            })
                            :
                            <div className="flex justify-center items-center  h-[90dvh] w-full border">
                                {accessToken&&cartItems?.items?.length ===0&&<CartEmptyViewComponent title={'Your Bag is empty.'} />}
                            </div>

                            }

                        </div>


                        {/* checkout section  */}
                        {cartItems?.items?.length > 0 && <div className=" sticky bottom-0 z-[1] ">
                            <div className="flex justify-end bg-transparent">
                                <button className="py-[5px] px-2 flex items-center gap-1 small-border-left small-border-top custom-border-grey800 background-custom-grey50 " onClick={toggleDetails}>
                                    <div className="all-caps-10 custom-text-grey900">Details</div>
                                    <Image src={ChevronUp} width={16} height={16} alt="img" quality={100} className={`duration-100 ${showDetails ? " " : " rotate-180 "}`} />
                                </button>
                            </div>
                            <div className="flex flex-col gap-4  small-border-top custom-border-grey800 background-custom-grey50">
                                <div className={`flex flex-col gap-2 duration-100 px-6 ${showDetails ? ' max-h-[400px] h-full pt-4  overflow-auto ' : '  max-h-0 overflow-hidden '}`}>
                                    <div className="flex justify-between">
                                        <div className="all-caps-10 custom-text-grey900">Subtotal:</div>
                                        <div className="flex items-center ">
                                            <div className="all-caps-12-bold custom-text-grey800">₹{Math.round(cartItems?.subtotal)}</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="all-caps-10 custom-text-grey900">Shipping:</div>
                                        <div className="all-caps-10-bold custom-text-grey900">FREE</div>
                                    </div>
                                </div>


                                {showDetails && <div className="px-6 w-full">
                                    <DashedBorder/>
                                </div>}

                                <div className="flex justify-between  px-6">
                                    <div className="all-caps-12 custom-text-grey900">Total</div>
                                    <div className="flex flex-col items-end gap-1.5">
                                        <div className="flex items-center ">
                                            <div className="all-caps-12-bold custom-text-grey800">₹{cartItems?.total}</div>

                                        </div>
                                        <div className="body-xs custom-text-grey600">incl. of all taxes</div>
                                    </div>
                                </div>

                                <div className="px-6 w-full">
                                    <DashedBorder/>
                                </div>
                                <div className="custom-text-grey600 body-xs px-6 text-center">Note: You can apply coupons and see delivery estimates at checkout.</div>
                                <div className="flex flex-col">
                                    <button className={`text-center all-caps-12-bold  custom-text-white px-5 py-4 ${notEligibleForCheckout ? ' background-custom-grey500 ' : '  bg-black '}`} onClick={handleSecureCheckout} disabled={notEligibleForCheckout}>Secure Checkout</button>
                                </div>
                            </div>
                        </div>
                           
                        }


                    </div>
                </section>}
        </>
    );
}

export default ShoppingBagSection;


