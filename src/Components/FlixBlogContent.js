"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PropTypes from 'prop-types';

//component
import FlixFooter from "./FlixFooter";

//Lottie
import Lottie from "lottie-react";
import ReadMore from '@/lottie/read-more.json';
import ArrowButton from '@/lottie/arrow-btn.json';

//PAGE
import BlogPage from '@/app/flix/[blog]/Blog';

// icons
// import ArrowRigth from '@/Images/Icons/arrow-right.svg';


//base URL
let baseUrl = process.env.STRAPI_ENDPOINT;


// BlogShowcase
const FlixBlogContent = ({ data }) => {

  const [modalVisible, setModalVisible] = useState(false);  //Modal state (Blog Reader)
  
  let handleReadMore = useCallback(()=> {
    // router.push("flix-blogs/" + data.documentId);
    setModalVisible(true);
  },[modalVisible]);

  // const handleBack = () => {
  //   router.back();
  // }


  function getImgUrl(data) {
    const imgName = data.CoverImage.formats?.large?.url || data.CoverImage.formats?.medium?.url || data.CoverImage.formats?.small?.url || data.CoverImage.formats?.thumbnail.url;
    return (imgName ? (baseUrl + imgName) : "");
  }

  const title = data.Title;
  const url = `flix/${data.documentId}`;

  return (

    <div className="relative w-full h-full flex flex-col justify-end snap-start snap-always ">

      {/* Blog reader MODAl */}
      <BlogPage modalVisible={modalVisible} setModalVisible={setModalVisible} data={data} />

      {/* blog cover image */}
      <Image src={getImgUrl(data)} alt="img" width={390} height={802} quality={100} className="absolute top-0 left-0 min-w-[200px] w-full h-full object-cover -z-[1]" />

     {/* Read More Link */}
      <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer flex flex-col justify-center items-center z-[1]" onClick={handleReadMore} type="button">
          <Lottie animationData={ReadMore} loop={true}/>
          <Lottie animationData={ArrowButton} loop={true} style={{marginTop:"-87px"}}/>
      </button>

      {/* Blog title */}
      <section className={"bg-flix-blog-title-gradient w-full sticky pt-[50%] flex flex-col justify-center items-center " } >

        {/* href={"flix-blogs/" + data.documentId}  */}
        <Link href='#' onClick={handleReadMore} className="gap-5 mx-4 flex flex-col items-center pb-9 " >
          <h1 className="heading-h1 custom-text-white text-center ">
            {`${data?.Title}`}
          </h1>

          {/* Read More Link */}
          {/* <div className=" gap-1.5 flex flex-row items-center " onClick={handleReadMore} >

            <p className="all-caps-10-bold custom-text-white uppercase ">
              Read more
            </p>

            <Image src={ArrowRigth} height={16} width={16} alt="Arrow Icon" quality={100} />
          </div> */}

        </Link>

        <FlixFooter positionValue="" modalVisible={modalVisible} isLogo={true} title={title} url={url} id={data.documentId} />

      </section>
      
    </div>
  );
};

export default FlixBlogContent;

FlixBlogContent.propTypes={
  data:PropTypes.object
};


//Original code
// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// import { Plus_Jakarta_Sans } from "next/font/google";

// //fonts
// const plus_jakarta_sans = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   display: "swap",
// });


// //PAGE
// import BlogPage from '@/app/flix-blogs/[blog]/Blog';

// //component
// import FlixFooter from "./FlixFooter";


// // icons
// import ArrowRigth from '@/Images/Icons/arrow-right.svg';


// //base URL
// let baseUrl = process.env.STRAPI_ENDPOINT;
// // let baseUrl = "http://148.135.138.27:1337";


// // BlogShowcase
// const FlixBlogContent = ({ data }) => {

//   const [modalVisible, setModalVisible] = useState(false);  //Modal state (Blog Reader)
  
//   let router = useRouter();


//   function handleReadMore() {
//     // router.push("flix-blogs/" + data.documentId);
//     setModalVisible(true);
//   }

//   // const handleBack = () => {
//   //   router.back();
//   // }


//   function getImgUrl(data) {
//     const imgName = data.CoverImage.formats?.large?.url || data.CoverImage.formats?.medium?.url || data.CoverImage.formats?.small?.url || data.CoverImage.formats?.thumbnail.url;
//     return (imgName ? (baseUrl + imgName) : "");
//   }

//   const title = data.Title;
//   const url = `flix-blogs/${data.documentId}`;

//   return (

//     <div className="relative w-full h-full flex flex-col justify-end snap-start snap-always ">

//       {/* Blog reader MODAl */}
//       <BlogPage modalVisible={modalVisible} setModalVisible={setModalVisible} data={data} />

//       {/* blog cover image */}
//       <Image src={getImgUrl(data)} alt="img" width={390} height={802} quality={100} className="absolute top-0 left-0 min-w-[200px] w-full h-full object-cover -z-[1]" />

//       {/* Blog title */}
//       <section className={"bg-flix-blog-title-gradient w-full sticky pt-[50%] flex flex-col justify-center items-center " + plus_jakarta_sans.className} >

//         {/* href={"flix-blogs/" + data.documentId}  */}
//         <Link href='#' onClick={handleReadMore} className="gap-5 mx-4 flex flex-col items-center  pb-9 " >
//           <h1 className="heading-h1 custom-text-white text-center ">
//             {`${data?.Title}`}
//           </h1>

//           {/* Read More Link */}
//           <div className=" gap-1.5 flex flex-row items-center " onClick={handleReadMore} >
//             <p className="all-caps-10-bold custom-text-white uppercase ">
//               Read more
//             </p>

//             <Image src={ArrowRigth} height={16} width={16} alt="Arrow Icon" quality={100} />
//           </div>

//         </Link>

//         <FlixFooter positionValue="" modalVisible={modalVisible} isLogo={true} title={title} url={url} id={data.documentId} />

//       </section>
      
//     </div>
//   );
// };

// export default FlixBlogContent;



// function getImgUrl(data) {
//   if (data.FeaturedImageOrVideo?.ext == "mp4") { return foryouImage0;}
//   let imgName = data.FeaturedImageOrVideo.formats?.large?.url || data.FeaturedImageOrVideo.formats?.medium?.url ||  data.FeaturedImageOrVideo.formats?.small?.url || data.FeaturedImageOrVideo.formats?.thumbnail.url;
//   return !imgName ? featureImg1 : baseUrl + imgName;
// }

// export {getImgUrl};
