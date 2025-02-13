import EmailVerifySection from "./EmailVerifySection";
import { Suspense } from "react";

function Page() {
    
    return(
        <>
        <Suspense>
            <EmailVerifySection/>
        </Suspense>
        </>
    );
}
export default Page;
