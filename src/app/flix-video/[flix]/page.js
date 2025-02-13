"use client";
import React from "react";
import Flix from "./Flix";

const page = ({ params }) => {
  return (
    <>
      <Flix playbackId={params.flix} />
    </>
  );
};

export default page;






// "use client";
// import React from "react";
// import Flix from "./Flix";

// const page = ({ params,videoTitle  }) => {
//   const playbackId = params.flix; // Assuming `flix` is part of the route params
//   const videoTitle = "Sample Video Title"; // Replace with dynamic or static title
//   const thumbnail = "/path/to/thumbnail.jpg"; // Replace with dynamic or static thumbnail path

//   return (
//     <>
//       <Flix playbackId={playbackId} videoTitle={videoTitle} thumbnail={thumbnail} />
//     </>
//   );
// };

// export default page;

