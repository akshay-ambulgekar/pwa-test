import React from "react";
import BorderImg from '@/Images/Icons/border-img.svg';
import Image from "next/image";



const DashedBorder = () => {
    return (
        <>
            <div className="w-full">
                <Image src={BorderImg} width={300} height={1} alt="img" quality={100} className="bg-repeat-x w-full" />
            </div>
        </>
    );
};

export default DashedBorder;
