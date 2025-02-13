"use client";
import React from "react";
import Blog from "./Blog";

const page = ({ params }) => {
  return (
    <>
     <Blog id={params.blog} />
    </>
  );
};

export default page;
