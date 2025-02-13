'use client';
//header images
import CloseIcon from '@/Images/Store/close-icon.svg';
// import Pepcoin from '@/Images/Homepage/pepcoin-icon.svg';
import Share from '@/Images/Store/share-icon.svg';
import Store from '@/Images/Icons/bag-icon-light.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import { useState } from 'react';/
// import FlixShareButton from './FlixShareButton';
import { RWebShare } from 'react-web-share';
import { useCallback } from 'react';

import PropTypes from 'prop-types';


function StoreShopPepoinNavbar({share=false,store=false,backclickurl='/store/home',accessToken='',isItemsPresentInCart=false,routerBackClick}) {


let router=useRouter();

    let handlebackClick=useCallback(()=>
    {
        if(routerBackClick)
        {
            router.back();
        }
        router.push(backclickurl);
    },[]);


    // function handleShareClick()
    // {
        
    // }
    let url=window?.location?.href;
    return (
        <>
            <div className="flex items-center justify-between py-3 px-4 small-border-bottom border-black sticky top-0 left-0 background-custom-grey50 z-[1]">
                <button onClick={handlebackClick}>     
                    <Image src={CloseIcon} width={20} height={20} alt="img" quality={100} className="" />
                </button>
                <div className="flex items-center gap-4 ">
                    {share && <RWebShare data={{url: url}}>
                        <button type="button">
                            <Image src={Share} width={20} height={20} alt="Share" quality={100} />
                        </button>
                    </RWebShare>}
                   {store&&accessToken&& 
                   <Link href={'/store/shopping-bag'} className='relative'>
                       <Image src={Store} width={20} height={20} alt="img" quality={100} className="" />
                      {isItemsPresentInCart&& <div className="w-2 h-2 small-border border-black background-custom-green rounded-full absolute top-0.5 right-0"></div>}
                   </Link>}
                </div>
            </div>

        </>
    );
}

export default StoreShopPepoinNavbar;

StoreShopPepoinNavbar.propTypes={
    share:PropTypes.bool,
    store:PropTypes.bool,
    backclickurl:PropTypes.string,
    accessToken:PropTypes.string,
    isItemsPresentInCart:PropTypes.bool,
    routerBackClick:PropTypes.bool,
};