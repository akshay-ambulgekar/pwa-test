"use client";
import React from "react";


//component
import AccountButton from "@/Components/AccountButton";
import PageBackButton from "@/Components/PageBackButton";
import ReadFaqSection from "@/Components/ReadFaqSection";

//icons
import PrivacyPolicy from "@/Images/Icons/privacy-policy-icon.svg";
import TermsOfUse from "@/Images/Icons/terms-of-use-icon.svg";
import ShippingandReturns from "@/Images/Icons/shipping-and-returns-icon.svg";
import CookiePolicy from "@/Images/Icons/cookie-policy-icon.svg";
import AboutUs from "@/Images/Icons/about-us-icon.svg";
import UpRightArrow from "@/Images/Icons/up-right-arrow-icon.svg";



const LegalPoliciesAndMoreSection = () => {

  return (
    <article className={"relative overflow-x-hidden overflow-y-visible scroll-smooth page-center-parent-container min-h-[100dvh] border-r-[0.5px] border-l-[0.5px] custom-border-grey950 "}>

      <PageBackButton/>
      
      <main className="relative">

        {/* legal section */}
        <h3 className="heading-h3 custom-text-grey900 font-semibold pt-6 pl-4 pb-5 border-b-[0.5px] custom-border-grey900">
          Legal
        </h3>
        <AccountButton href="/my-account/legal/privacy-policy/" buttonIcon={PrivacyPolicy} buttonName="Privacy Policy"/>
        <AccountButton href="/my-account/legal/terms-of-use" buttonIcon={TermsOfUse} buttonName="Terms of Use"/>
        <AccountButton href="/my-account/legal/shipping-return-refund" buttonIcon={ShippingandReturns} buttonName="Shipping & Returns"/>
        <AccountButton href="/my-account/legal/cookies-policy" buttonIcon={CookiePolicy} buttonName="Cookie Policy"/>

        {/* more section */}
        <h3 className="heading-h3 custom-text-grey900 font-semibold pt-10 pl-4 pb-5 border-b-[0.5px] custom-border-grey900">
          More
        </h3>
        <AccountButton href="https://payppy.co/payppy-india" target="_blank" buttonIcon={AboutUs} buttonName="About us" buttonIcon2={UpRightArrow} arrowIcon={false}/>
        {/* <AccountButton href="#" buttonIcon={BecomePartner} buttonName="Become Partner" buttonIcon2={UpRightArrow} arrowIcon={false}/> */}

      </main>

      <footer className=" w-full">
        {/* FAQS section */}
        <ReadFaqSection/>
      </footer>
      
    </article>
  );
};

export default LegalPoliciesAndMoreSection;
