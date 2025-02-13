import React, { Suspense } from 'react';
import OrderFailSection from './OrderFailSection';

const page = () => {
  return (
   <>
   <Suspense>
        <OrderFailSection/>
   </Suspense>
   </>
  );
};

export default page;