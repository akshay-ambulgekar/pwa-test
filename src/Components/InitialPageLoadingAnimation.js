import LoadingAnimation from "@/app/auth/LoadingAnimation";
import React from "react";

function IntialLoadingAnimation()
{
    return(
        <>
            <section className={"flex justify-center h-screen w-full background-custom-grey100   " }>
                <div className="page-center-parent-container  h-full  overflow-scrollbar-hidden small-border-x custom-border-grey800 overflow-scroll flex flex-col items-center justify-center gap-7" >
                    <LoadingAnimation />
                    <h2 className="heading-h2 custom-text-grey900 text-center">&nbsp;</h2>
                </div>
            </section>
        </>
    );
}

export default React.memo(IntialLoadingAnimation);