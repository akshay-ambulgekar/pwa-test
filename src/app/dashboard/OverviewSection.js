'use client';
import React, { useState } from "react";
import Image from "next/image";

//components
import DashBoardSectionHeader from "@/Components/DashBoardSectionHeader";
import DashBoardGridButton from "@/Components/DashBoardGridButton";

//Images
import Dash1 from '@/Images/Dashboard/Dash1.jpg';

const OverviewSection = () => {

    const [isGridButtonActive, setIsGridButtonActive] = useState(''); //grid buttton components state

    return (

        <article className="w-full h-full p-6 border-t custom-border-grey200">

            <DashBoardSectionHeader heading="Key Metrics" fromDate="Aug 12" toDate="Aug 18" />

            {/* Dashboard grid */}
            <section className="grid grid-cols-2 grid-rows-3 gap-3 py-6 ">

                <DashBoardGridButton buttonName="Impressions" buttonData="180" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                <DashBoardGridButton buttonName="Reach" buttonData="112" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                <DashBoardGridButton buttonName="Interactions" buttonData="80" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                <DashBoardGridButton buttonName="Clicks" buttonData="92" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                <DashBoardGridButton buttonName="Revenue" buttonData="₹43K" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                <DashBoardGridButton buttonName="New Followers" buttonData="18" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

            </section>

            {/* chart image */}
            <Image src={Dash1} width={376} height={207} alt="img" quality={100} />

        </article>
    );
};

export default OverviewSection;
