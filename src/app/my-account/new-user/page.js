import React, { Suspense } from "react";
import NewUserSection from "./NewUserSection";


const page = () => {
  return (
    <>
    <Suspense>
       <NewUserSection/>
    </Suspense>
    </>
  );
};

export default page;
