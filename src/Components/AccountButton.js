import React from "react";
import Image from "next/image";
import Link from "next/link";

import PropTypes from 'prop-types';

//icons
import ChevronRight from "@/Images/Icons/chevron-right-icon-dark.svg";

const AccountButton = ({href,target,buttonName,buttonIcon,buttonIcon2, arrowIcon=true}) => {
  return (
    <>
      <Link href={href} target={target} className={"flex flex-row gap-3 border-b-[0.5px] custom-border-grey600 w-full "} >
        <div className=" gap-2 flex flex-row items-center py-7 pl-6 flex-grow">
         {buttonIcon &&  <Image src={buttonIcon} width={20} height={20} alt="" quality={100} />}
          <p className="uppercase all-caps-12 font-medium custom-text-grey900 ">
            {buttonName}
          </p>
        </div>
        { arrowIcon&&(<Image src={ChevronRight}  width={20} height={20} alt="img" quality={100} className=" py-7 mr-6"/>)}
        {buttonIcon2 && (<Image src={buttonIcon2}  width={20} height={20} alt="img" quality={100} className=" py-7 mr-6"/>)}
      </Link>
    </>
  );
};

export default AccountButton;

AccountButton.propTypes={
  href:PropTypes.string,
  target:PropTypes.string,
  buttonName:PropTypes.string,
  buttonIcon:PropTypes.object,
  buttonIcon2:PropTypes.object,
  arrowIcon:PropTypes.bool
};