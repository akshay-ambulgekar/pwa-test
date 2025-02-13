import { Suspense } from "react";
import MobileVerificationSection from "./MobileVerificationSection";



export default function Home() {

  return (
    <>
    <Suspense>
      <MobileVerificationSection/>
    </Suspense>

    </>
  );
}