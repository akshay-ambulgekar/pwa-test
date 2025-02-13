"use client";
import React from "react";
import Link from "next/link";
import "@/Styles/my-account/my-account.css";

//component
import AccountButton from "@/Components/AccountButton";
import AccountCopyrightSection from "@/Components/AccountCopyrightSection";
import StoreFooter from '@/Components/StoreFooter';

//icons
import Help from "@/Images/Icons/help-icon.svg";
import PolicyIcon from "@/Images/Icons/policy-icon.svg";

const NewUserSection = () => {
  return (
    <article className={ "page-center-parent-container min-h-[100dvh] border-r-[0.5px] border-l-[0.5px] custom-border-grey950 overflow-x-hidden overflow-y-visible scroll-smooth "} >
     
      {/* hero section */}
      <header className="small-border-bottom custom-border-grey800 ">
        <div className="gap-6 mt-4 mx-4 rounded-tl-xl rounded-tr-xl small-border-x small-border-top custom-border-grey800 background-custom-grey100 new-user-page-hero-gradient flex flex-col justify-center items-center">
          
          {/* welcome Section */}
          <section className="gap-2 w-full flex flex-col items-center mt-16 mx-5  ">
            <h2 className="heading-h2 custom-text-grey900 text-center ">
            Welcome to Payppy Membership!
            </h2>

            <p className="body font-normal text-center custom-text-grey900 mt-2 mx-16 ">
            From sensible rewards to irresistible collections, cool things await you on this side of the world.
            </p>
          </section>

        {/* login/Signup button */}
          <div className=" mt-3 mb-16">
            <Link href="#" className=" uppercase background-custom-green py-4 px-7 all-caps-12-bold custom-text-grey950 login-button-gradient border-[0.5px] custom-border-grey800 ">
            login/Signup
            </Link>
          </div>
        </div>
      </header>

      <main className=" flex flex-col">
        {/* help & support button */}
        <AccountButton href="/my-account/help"  buttonName="Help & Support" buttonIcon={Help}/>
      
        {/* policies button */}
        <AccountButton href="/my-account/legal" buttonName="Legal Policies & More" buttonIcon={PolicyIcon}/>
      </main>

     {/* copyright section */}
      <section className=" gap-10 pt-12 pb-32 px-6 ">
        <AccountCopyrightSection />
      </section>

      <StoreFooter/>

    </article>
  );
};

export default NewUserSection;
