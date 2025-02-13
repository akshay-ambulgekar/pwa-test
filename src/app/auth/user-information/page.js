import { Suspense } from "react";
import UserInformationSection from "./UserInformationSection";




export default function Home() {

  return (
    <>
    <Suspense>
      <UserInformationSection/>
    </Suspense>

    </>
  );
}