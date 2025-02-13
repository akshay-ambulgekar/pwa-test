import React, { useCallback } from "react";
import Image from "next/image";

//icons
import ArrowUp from "@/Images/Icons/arrow-up-icon.svg";
import ArrowDown from "@/Images/Icons/arrow-down-icon.svg";

import PropTypes from 'prop-types';


const ScrollButtons = ({containerName}) => {

    const scrollUp = useCallback(() => {
        if (containerName?.current)
          { containerName.current.scrollBy({top: -window.innerHeight,behavior: "smooth",});}
      },[]);
    
      const scrollDown = useCallback(() => {
        if (containerName?.current) 
          {containerName.current.scrollBy({ top: window.innerHeight, behavior: "smooth", });}
      },[]);

  return (
    <>
      <aside className=" hidden lg:absolute lg:-right-20 lg:bottom-20 z-[2] lg:flex lg:flex-col lg:items-center lg:gap-4">
        
        <button className="gap-2.5 p-1.5" onClick={scrollUp} type="button" aria-label="Scroll Up" >
          <Image src={ArrowUp} width={28} height={28} alt="" quality={100} />
        </button>

        <button type="button" onClick={scrollDown} className="gap-2.5 p-1.5" aria-label="Scroll Down">
          <Image src={ArrowDown} width={28} height={28} alt="" quality={100} />
        </button>
        
      </aside>
    </>
  );
};

export default ScrollButtons;

ScrollButtons.propTypes={
  containerName:PropTypes.any,
};