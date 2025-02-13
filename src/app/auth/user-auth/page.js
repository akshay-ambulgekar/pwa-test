import UserAuthPageSection from "./UserAuthPageSection";
import { Suspense } from "react";

function Page() {
    
    return(
        <>
        <Suspense>
          <UserAuthPageSection/>
        </Suspense>
        </>
    );
}
export default Page;
