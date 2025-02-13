'use client';
import React, { useState } from "react";
import Image from "next/image";

//components
import DashBoardSectionHeader from "@/Components/DashBoardSectionHeader";
import DashBoardGridButton from "@/Components/DashBoardGridButton";
import DashBoardFlixPerformance from "@/Components/DashBoardFlixPerformance";

//Images
import Dash1 from '@/Images/Dashboard/Dash1.jpg';

const ContentSection = () => {

    const [isGridButtonActive, setIsGridButtonActive] = useState(''); //grid buttton components state

    return (

        <article className="w-full h-full">

            {/* Collections Metrics */}
            <section className="p-6 border-y custom-border-grey200">

                <DashBoardSectionHeader heading="Collections Metrics" fromDate="Aug 12" toDate="Aug 18" />

                <div className="grid grid-cols-2 grid-rows-2 gap-3 py-6 ">

                    <DashBoardGridButton buttonName="Collection Views" buttonData="66" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                    <DashBoardGridButton buttonName="Product Views" buttonData="148" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                    <DashBoardGridButton buttonName="Add to Carts" buttonData="24" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                    <DashBoardGridButton buttonName="Conversion Rate" buttonData="12%" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                </div>

                {/* chart image */}
                <Image src={Dash1} width={376} height={207} alt="img" quality={100} />
            </section>

            {/* seperator */}
            <div className=" w-full min-h-3 background-custom-grey50 "></div>


            {/* Flix Metrics */}
            <section className="p-6 border-y custom-border-grey200">

                <DashBoardSectionHeader heading="Flix Metrics" fromDate="Aug 12" toDate="Aug 18" />

                <div className="grid grid-cols-2 grid-rows-2 gap-3 py-6 ">

                    <DashBoardGridButton buttonName="Views" buttonData="12K" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                    <DashBoardGridButton buttonName="Avg. Watch Time" buttonData="148 min" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                    <DashBoardGridButton buttonName="Completion Rate" buttonData="67%" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                    <DashBoardGridButton buttonName="Interactions" buttonData="24" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                    <DashBoardGridButton buttonName="CTR" buttonData="12" isGridButtonActive={isGridButtonActive} setIsGridButtonActive={setIsGridButtonActive} />

                </div>

                {/* chart image */}
                <Image src={Dash1} width={376} height={207} alt="img" quality={100} />
            </section>


            {/* seperator */}
            <div className=" w-full min-h-3 background-custom-grey50 "></div>


            {/* Flix Performance */}
            <section className="gap-6 p-6 border-y custom-border-grey200">
                <div className=" gap-3 flex flex-col">

                    <h3 className="heading-h3 custom-text-grey900"> Flix Performance </h3>

                    <div className=" gap-3">
                        <button className=" gap-2.5  py-1.5  px-2.5 rounded body-sm-bold custom-text-vivid-blue background-custom-light-sky-blue mr-3 ">Top</button>
                        <button className=" gap-2.5  py-1.5  px-2.5 rounded body-sm-bold custom-text-dim-grey background-custom-light-grey mr-3 ">Trending</button>
                    </div>

                    <div className=" gap-5 ">
                        <DashBoardFlixPerformance num={1} />
                        <DashBoardFlixPerformance num={2} />
                        <DashBoardFlixPerformance num={3} />
                    </div>

                </div>
            </section>

            {/* seperator */}
            <div className=" w-full min-h-3 background-custom-grey50 "></div>

        </article>
    );
};

export default ContentSection;

