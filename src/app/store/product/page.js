import ProductSection from "./ProductSection";
import { Suspense } from "react";

function Page() {
    
    return(
        <>
        <Suspense>
            <ProductSection/>
        </Suspense>
        </>
    );
}
export default Page;
