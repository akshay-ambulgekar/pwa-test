"use client";
import { RWebShare } from "react-web-share";
import Image from "next/image";

// Icons
import ShareLight from "@/Images/Icons/share-light.svg";

import PropTypes from 'prop-types';


const FlixShareButton = ({ title, url}) => {
  return (
    <RWebShare
      data={{
        // text:"Hey! I found this cool post on Payppy.app, and I think you'll love it. Check it out:",
        url: url,
        title: title,
      }}
    >
      <button type="button">
        <Image  src={ShareLight} width={24} height={24} alt="Share" quality={100} />
      </button>
    </RWebShare>
  );
};

export default FlixShareButton;

FlixShareButton.propTypes={
  title:PropTypes.string,
  url:PropTypes.string,
};




// "use client";
// import Image from "next/image";

// // Icons
// import ShareLight from "@/Images/Icons/share-light.svg";

// import PropTypes from 'prop-types';

// const FlixShareButton = ({ title, url }) => {
//   const shareContent = () => {
//     // Check if the Web Share API is supported
//     if (navigator.share) {
//       navigator.share({
      
//         text: "Hey! I found this cool post on Payppy.app, and I think you'll love it. Check it out:",
//         url: url,
//         title: title,
//       })
//       .then(() => {
//         // console.log('Content shared successfully');
//       })
//       .catch((error) => {
//         console.error('Error sharing content:', error);
//       });
//     } else {
//       alert('Web Share API is not supported on this device');
//     }
//   };

//   return (
//     <button type="button" onClick={shareContent}>
//       <Image src={ShareLight} width={24} height={24} alt="Share" quality={100} />
//     </button>
//   );
// };

// export default FlixShareButton;

// FlixShareButton.propTypes = {
//   title: PropTypes.string,
//   url: PropTypes.string,
// };



