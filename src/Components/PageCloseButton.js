import React, { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

//icons
import closeIcon from '@/Images/Icons/close-icon.svg';


const PageCloseButton = () => {

  const router = useRouter();

  const handleBack = useCallback(()=>{
    router.back();
  },[]);

  return (
    <div className=" w-full gap-[71px] pl-4 py-3 ">
      <button onClick={handleBack}>
        <Image src={closeIcon} width={24} height={24} alt="img" quality={100} />
      </button>
    </div>
   
  );
};

export default PageCloseButton;

