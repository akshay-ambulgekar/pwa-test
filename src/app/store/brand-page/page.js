import { Suspense } from "react";
import BrandPageSection from "./BrandPageSection";



function Page()
{
    return(
        <>
        <Suspense>
            <BrandPageSection/>
        </Suspense>
        </>
    );
}

export default Page;