'use client';
import React, { useState } from "react";
import Link from "next/link";



//components
import PageCloseButton from "@/Components/PageCloseButton";
import AccordionComponent from "@/Components/AccordionComponent";

const HelpAndFAQSection = () => {

  const [activeSection, setActiveSection] = useState("Account");


  const accountItems = [
    {
      id: "1",
      title: "How can I create an account on the Payppy App?",
      content: (
        <>
          To create an account on the Payppy App, simply log onto{" "}
          <Link href="https://payppy.app/" className="underline" rel='noopener noreferrer'>
            www.payppy.app
          </Link>{" "}
          and follow the registration prompts to set up your account with your
          email address or phone number.
        </>
      ),
    },

    {
      id: "2",
      title: "Is my personal information secure when creating an account?",
      content:
        "Yes, we take data security seriously. Your personal information is encrypted and protected according to industry standards.",
    },
    {
      id: "3",
      title: "How can I delete my account?",
      content:
        <>
        To delete your account, please mail us at <Link href="mailto:support@payppy.app"  className="underline" >support@payppy.app</Link>  to submit your request. Our team will process it as soon as possible.
        </>
          
    },
  ];


  const orderItems = [
    {
      id: "1",
      title: "How can I track my order on the Payppy App?",
      content: "Find your tracking ID on the ‘Track Orders’ section of my account page. We’ll also keep you updated via WhatsApp and SMS whenever possible.",
    },
    {
      id: "2",
      title: "Can I modify or cancel my order after it has been placed?",
      content: "Yes, you can modify or cancel your order within 24 hours of placing it. Simply go to your ‘recent orders’ under my account page and cancel your order.",
    },
    {
      id: "3",
      title: "What should I do if I receive the wrong item or my order is incomplete?",
      content: (
        <>
          If you receive the wrong item or your order is incomplete, please contact our customer support team via email at{" "}
          <Link href="mailto:support@payppy.app" className="underline">
            support@payppy.app
          </Link>{" "}
          immediately for assistance in resolving the issue.
        </>
      ),
    },
  ];

  const paymentsItems = [
    {
      id: "1",
      title: "What payment methods are accepted on the Payppy App?",
      content: "The Payppy App accepts various payment methods including credit/debit cards, mobile wallets, UPI, and Payppy Wallet balance if applicable.",
    },
    {
      id: "2",
      title: "Is my payment information secure when making a purchase?",
      content: "Yes, your payment information is securely processed using encryption and other security measures taken care of by Razorpay, protecting your financial data.",
    },
  ];


  const deliveryItems = [
    {
      id: "1",
      title: "How long does it take for orders to be delivered?",
      content: "Delivery times may vary depending on your location. Generally, it is 3-6 business days.",
    },
    {
      id: "2",
      title: "Can I choose the delivery method for my order?",
      content: "No, currently you cannot choose delivery options. You will be eligible for the standard delivery method.",
    },
    {
      id: "3",
      title: "What happens if my order is delayed or lost during delivery?",
      content: (
        <>
          In the event of a delayed or lost delivery, please contact us at{" "}
          <Link href="mailto:support@payppy.app" className="underline">
            support@payppy.app
          </Link>{" "}
          for assistance in tracking the package or arranging a replacement or refund.
        </>
      ),
    },
  ];


  const returnsItems = [
    {
      id: "1",
      title: "What is the return policy for items purchased on the Payppy App?",
      content: (
        <>
          Please refer to{" "}
          <Link href="/my-account/legal-policies-and-more/shipping-return-refund" className="underline">
            Payppy&apos;s return policy
          </Link>{" "}
          listed on the product page.
        </>
      ),
    },
    {
      id: "2",
      title: "How do I initiate a return for an item?",
      content: "Go to the my account page, select the return order link, select the appropriate reason for returning the product, and submit the request. You’ll be notified via email/SMS/WhatsApp once the return is generated.",
    },
  ];


  const productAndStockItems = [
    {
      id: "1",
      title: "How do I search for products on the Payppy App?",
      content: "We have a dedicated tab to search any product for your convenience. The tab also provides categories and menus to choose from and shop.",
    },
  ];

  const walletItems = [
    {
      id: "1",
      title: "How does the wallet feature work on the Payppy App?",
      content: "The wallet feature allows you to store funds within your Payppy account for faster and easier transactions. Your refunded money also gets stored in the wallet.",
    },
    {
      id: "2",
      title: "Can I transfer funds from my wallet to my bank account?",
      content: "Yes, you can transfer funds from your Payppy wallet to your linked bank account.",
    },
    {
      id: "3",
      title: "Are there any fees associated with using the wallet for transactions?",
      content: (
        <>
          Fees, if applicable, will be specified in our terms of service. Please refer to the{" "}
          <Link href="/my-account/legal-policies-and-more/terms-of-use" className="underline">
            terms of service
          </Link>{" "}
          for more information on fees associated with using the wallet feature.
        </>
      ),
    },
  ];

  const sections = [
    { name: "Account", items: accountItems },
    { name: "Orders", items: orderItems },
    { name: "Payments", items: paymentsItems },
    { name: "Delivery", items: deliveryItems },
    { name: "Returns", items: returnsItems },
    { name: "Product & Stock", items: productAndStockItems },
    { name: "Wallet", items: walletItems },
  ];

  return (
    <article className={"page-center-parent-container min-h-[100dvh] border-r-[0.5px] border-l-[0.5px] custom-border-grey950 " } >

      <header>

        <PageCloseButton />

        <h3 className="heading-h3 font-semibold custom-text-grey900 pl-4 mt-5">
          Help & FAQs
        </h3>

        {/* Options navbar */}
        <nav className="overflow-scrollbar-hidden gap-6 mt-5 pt-5 px-4 border-b-[0.5px] custom-border-grey800 flex flex-row overflow-x-scroll scroll-smooth overflow-y-hidden text-nowrap">
         {/* eslint-disable react/jsx-no-bind  */}
          {sections.map((section) => (
            <button key={section.name} onClick={() => setActiveSection(section.name)} type="button"
              className={`gap-2.5 pb-4 all-caps-10-bold custom-text-grey900 ${activeSection === section.name ? " font-semibold border-b-2  border-black" : " font-normal"}`} >
              {section.name}
            </button>
          ))}
        </nav>

      </header>

      <main className="gap-10 ">

        {/*accordions */}
        <section className="border-t-[0.5px] custom-border-grey400 p-4 flex flex-col ">
          {activeSection === "Account" && <AccordionComponent items={accountItems} />}
          {activeSection === "Orders" && <AccordionComponent items={orderItems} />}
          {activeSection === "Payments" && <AccordionComponent items={paymentsItems} />}
          {activeSection === "Delivery" && <AccordionComponent items={deliveryItems} />}
          {activeSection === "Returns" && <AccordionComponent items={returnsItems} />}
          {activeSection === "Product & Stock" && <AccordionComponent items={productAndStockItems} />}
          {activeSection === "Wallet" && <AccordionComponent items={walletItems} />}

        </section>

        {/* Contact us section */}
        <section className="gap-3 mt-10 flex flex-col justify-center items-center">
          <p className="body-sm font-normal custom-text-grey900">Still any doubts?</p>
          <Link href="mailto:support@payppy.app" className="border-[0.5px] custom-border-grey800 all-caps-10-bold custom-text-grey900  py-3 px-6" >
            Contact Us
          </Link>
        </section>

      </main>

    </article>
  );
};

export default HelpAndFAQSection;
