'use client';
import WishlistGreen from '@/Images/Icons/wishlist-toggle-green.svg';
import WishlistWhite from '@/Images/Icons/wishlist-toggle-white.svg';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import AddOrRemoveWishlistApi from '@/apis/store/AddOrRemoveWishlistApi';

import PropTypes from 'prop-types';

function ClothsImgInfoCompo({containerWidth,borderClass=' small-border-right ',data,addToCartButton=false,getWishlistedProducts,wishlistedProducts,accessToken})
{
    let[isMouseHover,setIsMouseHover]=useState(false);
    let[payloadObj,setPayloadObj]=useState({
        "product_id" :'',
        "product_thumbnail" :  '',
        "product_title": '',
        "product_price" : '',
        "is_wishlisted" : false
    });

    let router=useRouter();
   
    let ImageRef=useRef();

    useEffect(()=>{
        let obj=null;
        if(wishlistedProducts?.length>0)
        {

            wishlistedProducts?.forEach((element)=>{
                if(element.product_id===data.id)
                {
                    obj={...element};
                    // obj.is_wishlisted=element.is_wishlisted;
                   setPayloadObj({...element});
                   return;
                }
            });

            

            if(!obj)
            {
                obj = {
                    product_id: data?.id,
                    product_thumbnail: data?.thumbnail,
                    product_title: data?.title,
                    product_price: data?.variants[0]?.calculated_price?.calculated_amount,
                    is_wishlisted: false,
                };
                setPayloadObj({...obj});

            }

        }
        else{
            obj = {
                product_id: data?.id,
                product_thumbnail: data?.thumbnail,
                product_title: data?.title,
                product_price: data?.variants[0]?.calculated_price?.calculated_amount,
                is_wishlisted: false,
            };
            setPayloadObj({...obj});
        }
    },[wishlistedProducts]);

    let mouseHovered=useCallback(()=>
    {
            setIsMouseHover(true);
    },[isMouseHover]);

    let mouseHoverRemoved = useCallback(()=>{
        setIsMouseHover(false);
    },[isMouseHover]);

    let handleProductClick=useCallback(()=>
    {
        if(typeof window !== 'undefined'){
            window.location.href='/store/product?product='+data.id;         //in single product page it is not refreshing page so with this href the page gets refreshed
        } 
    },[]);

     //if someone click on product wishlist 
     let handleProductWishlistClick=useCallback((e)=>
     {
         e.stopPropagation();

         if(!accessToken)
         {
            router.push('/auth/user-auth');
         }
        
         let obj=payloadObj;
         obj.is_wishlisted=!obj.is_wishlisted;
         setPayloadObj(obj);
         AddOrRemoveWishlistApi(payloadObj,accessToken)
         .then((response)=>{
             if(response&&'message' in response)
             {
                 getWishlistedProducts();
             }
         });
     },[]);
    return(
        <>
                <div className={` flex flex-col  custom-border-grey800 flex-shrink-0 self-stretch scroll-smooth relative cursor-pointer ${containerWidth} ${borderClass}`} onClick={handleProductClick}>
                    <button className='absolute top-3 right-3 z-[2]' onClick={handleProductWishlistClick}>
                       <Image src={payloadObj?.is_wishlisted ? WishlistGreen : WishlistWhite} width={16} height={16} alt="img" quality={100}   />
                   </button>

                    <div className=" small-border-bottom custom-border-grey800  bg-[#F1F2F7] mix-blend-darken " onMouseEnter={mouseHovered} onMouseLeave={mouseHoverRemoved}>
                        <Image src={isMouseHover?(data?.images[1]?.url):(data?.thumbnail)} width={147} height={219} alt="img" quality={100} className={`w-full h-auto object-contain duration-100`} ref={ImageRef}/>
                    </div>
                    <div className="p-2.5 pb-5  flex flex-col gap-2  justify-center">
                        <div className="all-caps-10 custom-text-grey900 max-w-[160px] w-full text-ellipsis whitespace-nowrap overflow-hidden ">{data?.title}</div>
                        <div className="all-caps-10 custom-text-grey900">₹{data?.variants[0]?.calculated_price?.calculated_amount || ""}</div>
                    </div>
                   {addToCartButton&& <button className="small-border-y custom-border-grey800 all-caps-10-bold  py-2.5 px-3 text-center">Add to cart</button>}
                </div>
        {/* <WishlistToaster/> */}
        </>
    );
}

export default ClothsImgInfoCompo;

ClothsImgInfoCompo.propTypes={
    containerWidth:PropTypes.string,
    borderClass:PropTypes.string,
    data:PropTypes.any,
    addToCartButton:PropTypes.bool,
    getWishlistedProducts:PropTypes.func,
    wishlistedProducts:PropTypes.array,
    accessToken:PropTypes.string
};