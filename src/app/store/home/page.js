import { Suspense } from "react";
import StoreHomeSection from "./StoreHomeSection";

function Page() {
    
    return(
        <>
        <Suspense>
            <StoreHomeSection/>
        </Suspense>
        </>
    );
}
export default Page;
