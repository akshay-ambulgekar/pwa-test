'use client';
import React, { useState } from "react";
import Image from "next/image";

//components
import DashBoardSectionHeader from "@/Components/DashBoardSectionHeader";
import DashBoardGridButton from "@/Components/DashBoardGridButton";
import DashBoardTopSellingProduct from "@/Components/DashBoardTopSellingProduct";

//Images
import Dash1 from '@/Images/Dashboard/Dash1.jpg';
import Pant from '@/Images/Dashboard/pant.jpg';
import Jacket from '@/Images/Dashboard/jacket.jpg';



const SalesSection = () => {

    const [isGridButtonActive, setIsGridButtonActive] = useState(''); //grid buttton components state

    return (

        <article className="w-full h-full">

            {/* Key Metrics */}
            <section className="p-6 border-y custom-border-grey200">

                <DashBoardSectionHeader heading="Key Metrics" fromDate="Aug 12" toDate="Aug 18" />

                <div className="grid grid-cols-2 grid-rows-2 gap-3 py-6 ">

                    <DashBoardGridButton buttonName="Units Sold" buttonData="15" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                    <DashBoardGridButton buttonName="Revenue" buttonData="₹43K" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                    <DashBoardGridButton buttonName="AOV" buttonData="₹2,488" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                    <DashBoardGridButton buttonName="Conversion Rate" buttonData="12%" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                </div>

                {/* chart image */}
                <Image src={Dash1} width={376} height={207} alt="img" quality={100} />
            </section>

            {/* seperator */}
            <div className=" w-full min-h-3 background-custom-grey50 "></div>
            

            {/* Top Selling Products */}
            <section className="gap-6 p-6 border-y custom-border-grey200">

                <DashBoardSectionHeader heading="Top Selling Products" fromDate="Aug 12" toDate="Aug 18" />

                <div className=" gap-3 flex flex-col">

                    <div className="gap-5">
                        <DashBoardTopSellingProduct num={1} productName="Wide-Leg Trousers" price="4,950" imgSrc={Pant} />
                        <DashBoardTopSellingProduct num={2} productName="Waxed-Effect Technical Jacket" price="7,550" imgSrc={Jacket} />
                        <DashBoardTopSellingProduct num={3} productName="Wide-Leg Trousers" price="4,950" imgSrc={Pant} />
                    </div>

                </div>
            </section>

            {/* seperator */}
            <div className=" w-full min-h-3 background-custom-grey50 "></div>

        </article>
    );
};

export default SalesSection;


