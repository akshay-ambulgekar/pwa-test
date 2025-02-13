import React, { Suspense } from 'react';
import OrderCompleteSection from './OrderCompleteSection';

const page = () => {
  return (
   <>
   <Suspense>
      <OrderCompleteSection/>
   </Suspense>
   </>
  );
};

export default page;