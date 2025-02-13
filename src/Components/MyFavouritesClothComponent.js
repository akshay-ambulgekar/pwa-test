'use client';
import WishlistGreen from '@/Images/Icons/wishlist-toggle-green.svg';


import Image from 'next/image';

import AddOrRemoveWishlistApi from '@/apis/store/AddOrRemoveWishlistApi';

import PropTypes from 'prop-types';
import { useCallback } from 'react';



function MyFavouritesClothComponent({containerWidth,borderClass=' small-border-right ',myFavouriteViewData={},getWishlistedProducts,accessToken})
{
    let handleProductClick =useCallback(()=>
    {
        if(typeof window !== 'undefined'){
            window.location.href='/store/product?product='+myFavouriteViewData?.product_id;         //in single product page it is not refreshing page so with this href the page gets refreshed
        } 
    },[]);

    //if someone click on product wishlist 
    let handleProductWishlistClick=useCallback((e)=>
    {
        e.stopPropagation();

           let obj={
                "product_id" :myFavouriteViewData?.product_id,
                "product_thumbnail" :  myFavouriteViewData?.product_thumbnail,
                "product_title":myFavouriteViewData?.product_title,
                "product_price" : myFavouriteViewData?.product_price,
                "is_wishlisted" : !myFavouriteViewData?.is_wishlisted
            };
        AddOrRemoveWishlistApi(obj,accessToken)
        .then((response)=>{
            if(response&&'message' in response)
            {
                getWishlistedProducts();
            }
        });
    },[]);
    return(
        <>
                <div className={` flex flex-col  custom-border-grey800 flex-shrink-0 self-stretch scroll-smooth relative cursor-pointer ${containerWidth} ${borderClass}`} onClick={handleProductClick} >
                   <button className='absolute top-3 right-3 z-[2]' onClick={handleProductWishlistClick}>
                       <Image src={WishlistGreen} width={16} height={16} alt="img" quality={100}   />
                   </button>

                    <div className=" small-border-bottom custom-border-grey800  bg-[#F1F2F7] mix-blend-darken " >
                         <Image src={myFavouriteViewData?.product_thumbnail} width={147} height={219} alt="img" quality={100} className={`w-full h-auto object-contain`} />
                    </div>
                    <div className="p-2.5 pb-5  flex flex-col gap-2  justify-center">
                        <div className="all-caps-10 custom-text-grey900 max-w-[160px] w-full text-ellipsis whitespace-nowrap overflow-hidden ">{ myFavouriteViewData?.product_title || ""}</div>
                        <div className="all-caps-10 custom-text-grey900">₹{myFavouriteViewData?.product_price || ""}</div>
                    </div>
                  <button className="small-border-y custom-border-grey800 all-caps-10-bold  py-2.5 px-3 text-center" >Add to cart</button>
                </div>

        </>
    );
}

export default MyFavouritesClothComponent;

MyFavouritesClothComponent.propTypes={
    containerWidth:PropTypes.string,
    borderClass:PropTypes.string,
    myFavouriteViewData:PropTypes.object,
    getWishlistedProducts:PropTypes.func,
    accessToken:PropTypes.string,
};