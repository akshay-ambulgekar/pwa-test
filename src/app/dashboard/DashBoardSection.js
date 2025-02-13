'use client';
import React, { useCallback, useState } from "react";

//Modals
import OverviewSection from "./OverviewSection";
import AudienceSection from "./AudienceSection";
import ContentSection from "./ContentSection";
import SalesSection from "./SalesSection";
import DashBoardOptionButton from "@/Components/SmallComponent/DashBoardOptionButton";

const DashBoardSection = () => {

    const [activeOption, setActiveOption] = useState('Overview');   // Option navbar states, Default to "Overview"
    const [activeDay, setActiveDay] = useState('');                 // Day navbar states setActiveOption
    const [activeModal, setActiveModal] = useState('Overview');         // Modal states, Default to "Overview" 

    const handleOptions = useCallback(
        (buttonName) => {
            setActiveOption(buttonName);

            // Only update the activeModal if the button clicked is not already active
            if (activeModal !== buttonName) {
                setActiveModal(buttonName);
            }
        }, [activeModal, activeOption]
    );

    const handleDays = useCallback(
        (buttonName) => {
            setActiveDay(buttonName);
        }, [activeDay]
    );


    // option navbar functions
    let handleOptionButtonClick = useCallback((value) => {
        handleOptions(value);
    }, [activeOption, activeModal]);


    // days navbar functions

    const handle7DaysClick = useCallback(
        () => handleDays("7 days"), []
    );

    const handle30DaysClick = useCallback(
        () => handleDays("30 days"), []
    );

    const handle60DaysClick = useCallback(
        () => handleDays("60 days"), []
    );

    const handleCustomDaysClick = useCallback(
        () => handleDays("Custom"), []
    );

    const handleLifetimeDaysClick = useCallback(
        () => handleDays("Lifetime"), []
    );

    return (
        <div className=" w-full h-full overflow-scrollbar-hidden ">
            <div className="page-center-parent-container min-h-[100dvh] ">

                <div className=" background-custom-white small-border-x border-black flex flex-col  ">
                    <header className=" background-custom-grey50 ">
                        {/* heading */}
                        <h2 className="heading-h2 custom-text-grey900 mt-9 mb-5 text-center ">Payppy Analytics</h2>

                        {/* option navbar */}
                        <nav className="flex justify-center overflow-x-scroll overflow-scrollbar-hidden text-nowrap px-5  custom-border-grey200">
                            <DashBoardOptionButton buttonName={"Overview"} activeOption={activeOption} handleOptionButtonClick={handleOptionButtonClick} />
                            <DashBoardOptionButton buttonName={"Audience"} activeOption={activeOption} handleOptionButtonClick={handleOptionButtonClick} />
                            <DashBoardOptionButton buttonName={"Content"} activeOption={activeOption} handleOptionButtonClick={handleOptionButtonClick} />
                            <DashBoardOptionButton buttonName={"Sales"} activeOption={activeOption} handleOptionButtonClick={handleOptionButtonClick} />
                        </nav>

                        {/* days navbar */}
                        <nav className="background-custom-grey50 border-t custom-border-grey200 ">
                            <div className=" gap-2 py-6 px-6 overflow-x-scroll overflow-scrollbar-hidden text-nowrap">

                                <button onClick={handle7DaysClick} className={`gap-2.5 py-2 px-3 body-bold background-custom-grey100 rounded-[5.625rem]  ${activeDay === "7 days" ? "custom-text-white background-custom-grey900 " : "custom-text-grey600"} `} type="button"> 7 days </button>

                                <button onClick={handle30DaysClick} className={`gap-2.5 py-2 px-3 body-bold background-custom-grey100 rounded-[5.625rem] ml-2  ${activeDay === "30 days" ? " custom-text-white background-custom-grey900" : "custom-text-grey600"} `} type="button"> 30 days </button>

                                <button onClick={handle60DaysClick} className={`gap-2.5 py-2 px-3 body-bold background-custom-grey100 rounded-[5.625rem] ml-2  ${activeDay === "60 days" ? "custom-text-white background-custom-grey900" : "custom-text-grey600"} `} type="button"> 60 days </button>

                                <button onClick={handleCustomDaysClick} className={`gap-2.5 py-2 px-3 body-bold background-custom-grey100 rounded-[5.625rem] ml-2  ${activeDay === "Custom" ? "custom-text-white background-custom-grey900" : "custom-text-grey600"} `} type="button"> Custom </button>

                                <button onClick={handleLifetimeDaysClick} className={`gap-2.5 py-2 px-3 body-bold background-custom-grey100 rounded-[5.625rem] ml-2  ${activeDay === "Lifetime" ? "custom-text-white background-custom-grey900" : "custom-text-grey600"} `} type="button"> Lifetime </button>
                            </div>
                        </nav>

                    </header>

                    {/* Modals */}
                    <main className="gap-6">
                        {activeModal === "Overview" && <OverviewSection />}
                        {activeModal === "Audience" && <AudienceSection />}
                        {activeModal === "Content" && <ContentSection />}
                        {activeModal === "Sales" && <SalesSection />}
                    </main>

                </div>

            </div>

        </div>
    );
};
export default DashBoardSection;

