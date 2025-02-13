'use client';

import Image from 'next/image';
//images
import Whishlist from '@/Images/Store/wishlist-toggle-transparent.svg';
import WhishlistActive from '@/Images/Icons/wishlist-toggle-active.svg';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import PropTypes from 'prop-types';
import { useCallback } from 'react';


function ShppingBagMyFavouritesButtons({shoppingBagCount=0}) {

    let pathname=usePathname();
    let router=useRouter();

    let handleShoppingBagBtnClick=useCallback(()=>{
        router.push('/store/shopping-bag');
    },[]);

    let handleMyFavouritesBtnClick=useCallback(()=>{
        router.push('/store/my-favourites');
    },[]);
    
    return (
        <>
            {/* shopping bag & my Favourites catagory buttons */}
            <div className="grid grid-cols-2 small-border-bottom custom-border-grey800 ">
                <button className={` px-4 py-2.5 custom-text-grey800 small-border-right custom-border-grey800 text-center w-full ${pathname.includes('/shopping-bag')?' all-caps-12-bold ':' all-caps-12 '}`} onClick={handleShoppingBagBtnClick}>Shopping Bag ({shoppingBagCount})</button>
                <button className={`all-caps-12 px-4 py-2.5 custom-text-grey800 text-center w-full   flex items-center gap-1 justify-center ${pathname.includes('/my-favourites')?' all-caps-12-bold ':' all-caps-12 '}`} onClick={handleMyFavouritesBtnClick}>
                    <span>My Favourites</span>
                    <Image src={pathname.includes('/my-favourites')?WhishlistActive:Whishlist} width={12} height={12} alt="img" quality={100} className="" />
                </button>
            </div>
        </>
    );
}

export default ShppingBagMyFavouritesButtons;

ShppingBagMyFavouritesButtons.propTypes={
    shoppingBagCount:PropTypes.number,
};