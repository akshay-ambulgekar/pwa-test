import React from "react";
import SingleOrderListSection from "./SingleOrderListSection";

const page = ({params}) => {
  return (
    <>
        <SingleOrderListSection orderId={params.orderId}/>
    </>
  );
};

export default page;
