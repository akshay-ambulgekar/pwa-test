import React, { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

//icons
// import LeftChevron from '@/Images/Icons/chevron-left-icon-dark.svg';
import leftArrow from '@/Images/Icons/arrow-left-new.svg';


import PropTypes from 'prop-types';

const PageBackButton = ({url=''}) => {

    const router = useRouter();

    const handleBack = useCallback(() => { 
        if(url)
        {
            router.push(url);
        }
        else{
            router.back();
        }
    });

    return (
        <button onClick={handleBack} className="w-full gap-[71px] py-3 px-4  ">
            <Image src={leftArrow} width={24} height={24} alt="img" quality={100} />
        </button>
    );
};

export default PageBackButton;

PageBackButton.propTypes={
    url:PropTypes.string,
};