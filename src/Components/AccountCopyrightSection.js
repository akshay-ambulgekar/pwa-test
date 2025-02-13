import React from "react";
import Image from "next/image";
import Link from "next/link";


//logos
import instagram from '@/Images/Icons/instagram-icon.svg'; 
import youtube from '@/Images/Icons/youtube-icon.svg'; 

const AccountCopyrightSection = () => {
  return (
    <>
      <section className={"gap-4 px-6 flex flex-col items-center " }>
        <div className="gap-3 flex flex-row justify-center ">
          <Link href="https://www.youtube.com/@hotandcoolbypayppy" className="p-2.5 small-border custom-border-grey800 rounded-full" target="_blank">
            <Image src={youtube} width={18} height={18} alt="" quality={100} />
          </Link>

          <Link href="https://www.instagram.com/payppy.app/" className="p-2.5 small-border custom-border-grey800 rounded-full" target="_blank">
            <Image src={instagram} width={18} height={18} alt="" quality={100} />
          </Link>
        </div>
        <p className="!capitalize custom-text-grey700 text-center font-normal text-[0.625rem] leading-4 px-6 ">
          Copyright 2024. Payppy Technologies Private Limited. All Rights
          Reserved.
        </p>
      </section>
    </>
  );
};

export default AccountCopyrightSection;
