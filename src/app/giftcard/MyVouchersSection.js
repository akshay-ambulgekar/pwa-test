'use client';
import Image from "next/image";
import React, { useState } from "react";

//Icons
import Voucher from '@/Images/Icons/voucher-icon.svg';
import Payppy from '@/Images/Icons/payppy-logo.svg';
import Zomato from '@/Images/Icons/zomato-logo.svg';
import { Switch } from "@/Components/ui/switch";

const MyVouchersSection = () => {

    const [activeNavOption, setActiveNavOption] = useState('ALL');

    const handleNavOption = (buttonName) => {
        setActiveNavOption(buttonName);
    };
    return (
        <div className="page-center-parent-container ">
            <div className="w-full min-h-[100dvh] small-border-x custom-border-grey900 overflow-y-scroll overflow-x-hidden scroll-smooth overflow-scrollbar-hidden ">
                <header className="">
                    {/* hero section  */}
                    <div className=" gap-2 px-6 pt-10 flex flex-col text-center items-center ">
                        <Image src={Voucher} width={35} height={35} alt="img" quality={100} />
                        <h3 className="heading-h3 custom-text-grey900 capitalize">My Vouchers</h3>
                        <p className="body-sm custom-text-grey900  " > Win discounts from your favorite brands by shopping with us! Redeem them anytime or save for later.</p>
                    </div>

                    <nav className=" gap-6 pt-5 pr-4 pl-6 small-border-bottom custom-border-grey800 flex justify-center">
                        <button onClick={() => handleNavOption('ALL')} className={` gap-2.5 pb-4 border-b-2  all-caps-10 custom-text-grey800 uppercase ${activeNavOption === 'ALL' ? "custom-border-grey900  all-caps-10-bold" : "border-transparent"}`}>all</button>
                        <button onClick={() => handleNavOption('WON')} className={` gap-2.5 pb-4 border-b-2  all-caps-10 custom-text-grey800 uppercase ${activeNavOption === 'WON' ? "custom-border-grey900 all-caps-10-bold" : "border-transparent"}`}>won</button>
                        <button onClick={() => handleNavOption('REDEEMED')} className={` gap-2.5 pb-4 border-b-2  all-caps-10 custom-text-grey800 uppercase ${activeNavOption === 'REDEEMED' ? "custom-border-grey900 all-caps-10-bold" : "border-transparent"}`}>Redeemed</button>
                        <button onClick={() => handleNavOption('EXPIRED/USED')} className={` gap-2.5 pb-4 border-b-2  all-caps-10 custom-text-grey800 uppercase ${activeNavOption === 'EXPIRED/USED' ? "custom-border-grey900 all-caps-10-bold" : "border-transparent"}`}>Expired/used</button>
                    </nav>
                </header>

                <main className="flex flex-col ">

                    <article className=" px-6 pt-6 w-full ">

                        <div className="background-custom-crimson-red flex flex-col  ">
                            <span className="gap-2 pt-4 pl-4 all-caps-10 custom-text-white uppercase ">
                                Exprires 27 Jun 2025
                            </span>
                            <div className="flex justify-center items-center flex-col gap-1 pt-10 pb-8 ">
                                <span className="gap-2.5">
                                    <h1 className="heading-h1 custom-text-white">4% OFF</h1>
                                </span>
                                <span className="all-caps-10 custom-text-white">Gift card voucher</span>
                            </div>
                            {/* brand logos */}
                            <div className="flex justify-between px-5 pb-5 ">
                                <Image src={Zomato} width={72} height={20} alt="img" quality={100} />
                                <Image src={Payppy} width={20} height={20} alt="img" quality={100} />
                            </div>
                        </div>

                        <button className="all-caps-10 custom-text-white uppercase py-3 px-6 background-custom-grey900 w-full ">Redeem Now</button>
                    </article>

                    <article className=" px-6 pt-6 w-full ">

                        <div className="background-custom-crimson-red flex flex-col  ">
                            <div className="flex justify-between pt-4 px-4">
                                <span className="gap-2  all-caps-10 custom-text-white uppercase ">
                                    Exprires 27 Jun 2025
                                </span>
                                <span className="all-caps-10-bold custom-text-white uppercase">mark as used</span>
                                <Switch />

                            </div>
                            <div className="flex justify-center items-center flex-col gap-1 pt-10 pb-8 ">
                                <span className="gap-2.5">
                                    <h1 className="heading-h1 custom-text-white">₹500</h1>
                                </span>
                                <span className="all-caps-10 custom-text-white">Shopping amount</span>
                            </div>
                            {/* brand logos */}
                            <div className="flex justify-between px-5 pb-5 ">
                                <Image src={Zomato} width={72} height={20} alt="img" quality={100} />
                                <Image src={Payppy} width={20} height={20} alt="img" quality={100} />
                            </div>
                        </div>

                    </article>

                    <article className=" px-6 pt-6 w-full ">

                        <div className="background-custom-grey600 flex flex-col  ">
                            <div className="flex justify-between pt-4 px-4 ">
                                <span className="gap-2 all-caps-10 custom-text-white uppercase ">
                                    Exprires 27 Jun 2025
                                </span>
                                <span className="all-caps-10-bold custom-text-white uppercase">mark as used</span>
                                <Switch />

                            </div>
                            <div className="flex justify-center items-center flex-col gap-1 pt-10 pb-8 ">
                                <span className="gap-2.5">
                                    <h1 className="heading-h1 custom-text-white">₹500</h1>
                                </span>
                                <span className="all-caps-10 custom-text-white">Shopping amount</span>
                            </div>
                            {/* brand logos */}
                            <div className="flex justify-between px-5 pb-5 ">
                                <Image src={Zomato} width={72} height={20} alt="img" quality={100} />
                                <Image src={Payppy} width={20} height={20} alt="img" quality={100} />
                            </div>
                        </div>

                    </article>

                </main>

            </div>
        </div>
    );
};

export default MyVouchersSection;
