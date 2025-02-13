'use client';
import React, { useState } from "react";
import Image from "next/image";

//components
import DashBoardSectionHeader from "@/Components/DashBoardSectionHeader";
import DashBoardGridButton from "@/Components/DashBoardGridButton";

//Images
import Dash1 from '@/Images/Dashboard/Dash1.jpg';
import AudienceInsights from '@/Images/Dashboard/Audience Insights.png';
import MostActivetimes from '@/Images/Dashboard/MostActive times.png';

const AudienceSection = () => {

    const [isGridButtonActive, setIsGridButtonActive] = useState(''); //grid buttton components state

    return (

        <article className="w-full h-full">

            {/* Key Metrics */}
            <section className="p-6 border-y custom-border-grey200">
            
                <DashBoardSectionHeader heading="Key Metrics" fromDate="Aug 12" toDate="Aug 18" />

                <div className="grid grid-cols-2 grid-rows-2 gap-3 py-6 ">

                    <DashBoardGridButton buttonName="Unique Users" buttonData="123" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                    <DashBoardGridButton buttonName="New Followers" buttonData="18" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                    <DashBoardGridButton buttonName="Returning Users" buttonData="24" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                    <DashBoardGridButton buttonName="Purchasing Users" buttonData="2" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                </div>

                {/* chart image */}
                <Image src={Dash1} width={376} height={207} alt="img" quality={100} />

            </section>

            {/* seperator */}
            <div className=" w-full min-h-3 background-custom-grey50 "></div>

            {/* AudienceSection Insights */}
            <section className="gap-6 p-6 border-y custom-border-grey200">

                <div className=" gap-3 flex flex-col">
                    <h3 className="heading-h3 custom-text-grey900">Audience Insights</h3>
                    {/* <div className=" gap-3">
                        <button className=" gap-2.5  py-1.5  px-2.5 rounded body-sm-bold custom-text-vivid-blue background-custom-light-sky-blue mr-3 ">Gender</button>
                        <button className=" gap-2.5  py-1.5  px-2.5 rounded body-sm-bold custom-text-dim-grey background-custom-light-grey mr-3 ">Age</button>
                        <button className=" gap-2.5  py-1.5  px-2.5 rounded body-sm-bold custom-text-dim-grey background-custom-light-grey mr-3 ">Location</button>
                    </div> */}

                    <Image src={AudienceInsights} width={342} height={297} alt="img" quality={100} />
                </div>
            </section>

            {/* seperator */}
            <div className=" w-full min-h-3 background-custom-grey50 "></div>

            {/* Most Active times */}
            <section className=" gap-6 p-6 border-y custom-border-grey200">

                <div className=" gap-3 flex flex-col">
                    <h3 className="heading-h3 custom-text-grey900">Most Active times</h3>
                    <Image src={MostActivetimes} width={342} height={321} alt="img" quality={100} />
                </div>

            </section>
            
            {/* seperator */}
            <div className=" w-full min-h-3 background-custom-grey50 "></div>

        </article>
    );
};

export default AudienceSection;
