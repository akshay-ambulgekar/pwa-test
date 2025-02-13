//final 
"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

//components
import NotificationDemo, { FlixToaster } from "./FlixToaster";

//icons
import ArrowLeft from '@/Images/Icons/arrow-left.svg';
import BookmarkLight from "@/Images/Icons/bookmark-light.svg";
import LikeLight from "@/Images/Icons/like-light.svg";

// active light icons for dark footer
import ActiveBookmarkLight from '@/Images/Icons/bookmark-active-light.svg';
import ActiveLikeLight from '@/Images/Icons/like-active-light.svg';

//logo
import HotAndCoolLogo from '@/Images/Icons/hot-and-cool-logo.png';

//API
import GetAccessTokenAPI from "@/apis/auth/GetAccessToken";
import FlixBlogSaveApi from "@/apis/flix/FlixBlogSaveApi";
import FlixBlogLikeApi from "@/apis/flix/FlixBlogLikeApi";
import FlixBlogFetchLikeAndSave from "@/apis/flix/FlixBlogFetchLikeAndSave";

import PropTypes from 'prop-types';
import { RWebShare } from "react-web-share";

// Icons
import ShareLight from "@/Images/Icons/share-light.svg";

const FlixFooter = ({ positionValue, isLogo = false, modalVisible,setModalVisible, url,id, videoId, }) => {

  const [isBookmarkActive, setIsBookmarkActive] = useState(false);
  const [isLikeActive, setIsLikeActive] = useState(false);

  const router = useRouter();

  let [accessToken, setAccessToken] = useState(); // let[gettingAccessToken,setGettingAccessToken]=useState(true);

  useEffect(() => {
    getAccessToken();
  }, [modalVisible]);

  // getting access token
  function getAccessToken() {
    GetAccessTokenAPI()
      .then((response) => {
        // console.log(response);
        // if (response && 'message' in response && response.message === 'Refresh token is missing!') {
        //   window.location.href = '/auth/user-auth';
        // }
        if (response && 'access_token' in response) {
          setAccessToken(response.access_token);
        }

      })
      .catch(() => {

      });
  } 


   //hide footer if access token not found
  // if (!accessToken) {
  //   return (<></>)
  // }


  // FETCH api call
  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken || (!id && !videoId)) {return;} // Prevent unnecessary API calls
      await fetchLikedAndSavedBlogs(accessToken, id, videoId);
    };
  
    fetchData();
  }, [accessToken, id, videoId]); // Ensure dependency array is correct

  
  async function fetchLikedAndSavedBlogs(accessToken, id, videoId) {
    try {
      const response = await FlixBlogFetchLikeAndSave(accessToken);

      // Ensure the response has the required structure
      const result = response?.liked_and_saved_videos?.find(
        (item) => item.content_id === id || item.video_id === videoId
      );

      if (result) {
        // Update states
        setIsLikeActive(result.liked);
        setIsBookmarkActive(result.saved);
      } 
    } catch (error) {
      console.error("Error fetching liked and saved blogs:", error);
    }
  }
  
  
  // SAVE api call
  let saveFlixBlog=useCallback(()=>{
   
    if (!accessToken) {
      router.push('/auth/user-auth');
    }

    let obj = {
      'content_id': id,
      'video_id':videoId,
      "saved": !isBookmarkActive,
    };

    FlixBlogSaveApi(obj, accessToken)
      .then((response) => {
        if (response) {
          const isSaved = response.saved;
          isSaved? setIsBookmarkActive(true):setIsBookmarkActive(false);
          const toastMessage = response.saved ? "Added to Saved Flix" : "Removed from Saved";
          NotificationDemo(toastMessage,isSaved); // Show toast with the appropriate message
          fetchLikedAndSavedBlogs(accessToken,id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },[]);

  // LIKE api call
  let likeFlixBlog=useCallback(()=>{

    if (!accessToken) {
      router.push('/auth/user-auth');
    }

    let obj = {
      'content_id': id,
      'video_id':videoId,
      "liked": !isLikeActive,
    };

    FlixBlogLikeApi(obj, accessToken)
      .then((response) => {
        if (response) {
          const isLiked = response.liked;
          isLiked ? setIsLikeActive(true) : setIsLikeActive(false);
          const toastMessage = response.liked ? "Liked" : "Unliked";
          NotificationDemo(toastMessage, isLiked); // Show toast with the appropriate message
          fetchLikedAndSavedBlogs(accessToken,id );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },[]);

  const handleBack = useCallback(async() => {
    if (setModalVisible) {
      setModalVisible("animate-slide-out");
      fetchLikedAndSavedBlogs(accessToken,id );
      setTimeout(() => {
        setModalVisible(false); // Hide the modal
      }, 1300);
      return;
    }
    router.push("/");
  },[]);


  return (

    <footer className={`${positionValue} bottom-0 pb-10 w-full z-[3] `}>

      {/* Save / Like MODAL */}
      <FlixToaster/>

      {/* Back Button */}
      <button onClick={handleBack} type="button" className={`absolute z-[1] left-1/2 transform -translate-x-1/2 -ml-[120px] flex items-center justify-center gap-8 p-3 rounded-[90px] cursor-pointer flix-footer-dark-fradient footer-border-dark `}>
        <Image src={ArrowLeft} width={24} height={24} alt="img" quality={100} />
      </button>


      {/* Action Buttons */}
      <div className={`relative flex justify-center items-center`}>

        <section className={`flex gap-6 px-5 py-3 rounded-[90px] flix-footer-dark-fradient footer-border-dark`} >

          <button aria-label="Bookmark" onClick={saveFlixBlog} type="button" >
            <Image src={isBookmarkActive ? ActiveBookmarkLight : BookmarkLight}
              width={24} height={24} alt="Bookmark" quality={100} />
          </button>

          <button aria-label="Like" onClick={likeFlixBlog} type="button" >
            <Image src={isLikeActive ? ActiveLikeLight : LikeLight}
              width={24} height={24} alt="Like" quality={100} />
          </button>

          <RWebShare
            data={{
              title: "Hey! I found this cool post on Payppy.app, and I think you'll love it. Check it out:",
              url: url,
            }} >
            <button type="button">
              <Image src={ShareLight} width={24} height={24} alt="Share" quality={100} />
            </button>
          </RWebShare>

        </section>

        {/* hot and cool Logo */}
        {isLogo && <div className=" absolute z-[3] left-1/2 transform translate-x-1/2 ml-16 flex justify-center items-center ">
        {/* ml-16 */}
          <Image src={HotAndCoolLogo} width={53} height={40} alt="hot&cool" quality={100} className="object-center object-cover" />
        </div>}

      </div>

    </footer>
  );
};

export default FlixFooter;


FlixFooter.propTypes={
  positionValue : PropTypes.string,
  isLogo : PropTypes.bool,
  modalVisible : PropTypes.bool,
  setModalVisible : PropTypes.func,
  title : PropTypes.string,
  url : PropTypes.string,
  id : PropTypes.string,
  videoId : PropTypes.string,
};
//26dec
// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// //components
// import FlixShareButton from "./FlixShareButton";
// import NotificationDemo, { FlixToaster } from "./FlixToaster";

// //icons
// import ArrowLeft from '@/Images/Icons/arrow-left.svg';
// import BookmarkLight from "@/Images/Icons/bookmark-light.svg";
// import LikeLight from "@/Images/Icons/like-light.svg";

// // active light icons for dark footer
// import ActiveBookmarkLight from '@/Images/Icons/bookmark-active-light.svg';
// import ActiveLikeLight from '@/Images/Icons/like-active-light.svg';

// //logo
// import HotAndCoolLogo from '@/Images/Icons/hot-and-cool-logo.png';


// //API
// import GetAccessTokenAPI from "@/apis/auth/GetAccessToken";
// import FlixBlogSaveApi from "@/apis/flix/FlixBlogSaveApi";
// import FlixBlogLikeApi from "@/apis/flix/FlixBlogLikeApi";
// import FlixBlogFetchLikeAndSave from "@/apis/flix/FlixBlogFetchLikeAndSave";


// const FlixFooter = ({ positionValue, isLogo = false, modalVisible,setModalVisible, title, url,id, videoId, }) => {

//   const [isBookmarkActive, setIsBookmarkActive] = useState(false);
//   const [isLikeActive, setIsLikeActive] = useState(false);

//   const router = useRouter();

//   let [accessToken, setAccessToken] = useState(); // let[gettingAccessToken,setGettingAccessToken]=useState(true);

//   useEffect(() => {
//     getAccessToken();
//   }, [modalVisible])

//   // getting access token
//   function getAccessToken() {
//     GetAccessTokenAPI()
//       .then((response) => {
//         // console.log(response);
//         // if (response && 'message' in response && response.message === 'Refresh token is missing!') {
//         //   window.location.href = '/auth/user-auth';
//         // }
//         if (response && 'access_token' in response) {
//           setAccessToken(response.access_token);
//         }

//       })
//       .catch(() => {

//       })
//   } 

//   // for fecth likes and save
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     if (accessToken) {
//   //       if (id) {
//   //         await fetchLikedAndSavedBlogs(accessToken, id);
//   //       }
//   //       if (videoId) {
//   //         await fetchLikedAndSavedBlogs(accessToken, videoId);
//   //       }
//   //     }
//   //   };
  
//   //   fetchData();
//   // }, [accessToken, id, videoId]);
  


//   //hide footer if access token not found
//   // if (!accessToken) {
//   //   return (<></>)
//   // }

//   // //fetch like and saved blogs
//   async function fetchLikedAndSavedBlogs(accessToken,id) {

//     try {
//       // console.log(accessToken,"accessToken in fetchLikedAndSavedBlogs ");
//       const response = await FlixBlogFetchLikeAndSave(accessToken);

//       // console.log("from fetch all",response);
  
//       // Find the specific content by ID
//       const result = response.liked_and_saved_videos.find(
//         (item) => item.content_id === id 
//       );


//       if (result) {
//         console.log("item.liked:", result.liked, "item.saved:", result.saved);
  
//         // Update states based on the response
//         setIsLikeActive(result.liked);
//         console.log("activelike", isLikeActive);
//         setIsBookmarkActive(result.saved);
//         console.log("activebookmark", isBookmarkActive);
//       } else {
//         console.log("No item found with the given blog id:", id);
//       }

//     } catch (error) {
//       console.error("Error fetching liked and saved blogs:", error);
//     }
//   }

//   //fetch like and saved videos
//   //  async function fetchLikedAndSavedBlogs(accessToken,videoId) {

//   //   try {
//   //     console.log(accessToken,"accessToken in fetchLikedAndSavedBlogs ")
//   //     const response = await FlixBlogFetchLikeAndSave(accessToken);
//   //     console.log("from fetch boy",response);
  
//   //     // Find the specific content by ID
//   //     const result = response.liked_and_saved_videos.find(
//   //       (item) => item.video_id === videoId 
//   //     );
      
  
//   //     if (result) {
//   //       console.log("item.liked:", result.liked, "item.saved:", result.saved);
  
//   //       // Update states based on the response
//   //       setIsLikeActive(result.liked);
//   //       console.log("activelike", isLikeActive);
//   //       setIsBookmarkActive(result.saved);
//   //       console.log("activebookmark", isBookmarkActive);
//   //     } else {
//   //       console.log("No item found with the given id:", videoId);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching liked and saved blogs:", error);
//   //   }
//   // }

 

  
//   // SAVE blog api call
//   function saveFlixBlog() {
   
//     if (!accessToken) {
//       router.push('/auth/user-auth');
//     }

//     let obj = {
//       'content_id': id,
//       'video_id':videoId,
//       "saved": !isBookmarkActive,
//     }

//     FlixBlogSaveApi(obj, accessToken)
//       .then((response) => {
//         console.log("response",response);
//         if (response) {
//           const isSaved = response.saved;
//           isSaved? setIsBookmarkActive(true):setIsBookmarkActive(false);
//           const toastMessage = response.saved ? "Added to Saved Flix" : "Removed from Saved";
//           NotificationDemo(toastMessage,isSaved); // Show toast with the appropriate message
//           fetchLikedAndSavedBlogs(accessToken,id);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   // LIKE blog api call
//   function likeFlixBlog() {

//     if (!accessToken) {
//       router.push('/auth/user-auth');
//     }

//     let obj = {
//       'content_id': id,
//       'video_id':videoId,
//       "liked": !isLikeActive,
//     }

//     FlixBlogLikeApi(obj, accessToken)
//       .then((response) => {
//         console.log("response", response);
//         if (response) {
//           const isLiked = response.liked;
//           isLiked ? setIsLikeActive(true) : setIsLikeActive(false);
//           const toastMessage = response.liked ? "Liked" : "Unliked";
//           NotificationDemo(toastMessage, isLiked); // Show toast with the appropriate message
//           fetchLikedAndSavedBlogs(accessToken,id );
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   const handleBack = async() => {
//     if (setModalVisible) {
//       setModalVisible("animate-slide-out");
//       fetchLikedAndSavedBlogs(accessToken,id );
//       setTimeout(() => {
//         setModalVisible(false); // Hide the modal
//       }, 1300);
//       return;
//     }
//     router.push("/");
//   };

//   return (

//     <footer className={`${positionValue} bottom-0 pb-10 w-full z-[3] `}>

//       {/* Save / Like MODAL */}
//       <FlixToaster/>

//       {/* Back Button */}
//       <button onClick={handleBack} type="button" className={`absolute z-[1] left-1/2 transform -translate-x-1/2 -ml-[120px] flex items-center justify-center gap-8 p-3 rounded-[90px] cursor-pointer flix-footer-dark-fradient footer-border-dark `}>
//         <Image src={ArrowLeft} width={24} height={24} alt="img" quality={100} />
//       </button>


//       {/* Action Buttons */}
//       <div className={`relative flex justify-center items-center`}>

//         <section className={`flex gap-6 px-5 py-3 rounded-[90px] flix-footer-dark-fradient footer-border-dark`} >

//           <button aria-label="Bookmark" onClick={saveFlixBlog} type="button" >
//             <Image src={isBookmarkActive ? ActiveBookmarkLight : BookmarkLight}
//               width={24} height={24} alt="Bookmark" quality={100} />
//           </button>

//           <button aria-label="Like" onClick={likeFlixBlog} type="button" >
//             <Image src={isLikeActive ? ActiveLikeLight : LikeLight}
//               width={24} height={24} alt="Like" quality={100} />
//           </button>

//           <FlixShareButton title={title} url={url} />

//         </section>

//         {/* hot and cool Logo */}
//         {isLogo && <div className=" absolute z-[3] left-1/2 transform translate-x-1/2 ml-16 flex justify-center items-center ">
//         {/* ml-16 */}
//           <Image src={HotAndCoolLogo} width={53} height={40} alt="hot&cool" quality={100} className="object-center object-cover" />
//         </div>}

//       </div>

//     </footer>
//   );
// };

// export default FlixFooter;

//25 dec
// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// //components
// import FlixShareButton from "./FlixShareButton";
// import NotificationDemo, { FlixToaster } from "./FlixToaster";

// //icons
// import ArrowLeft from '@/Images/Icons/arrow-left.svg';
// import BookmarkLight from "@/Images/Icons/bookmark-light.svg";
// import LikeLight from "@/Images/Icons/like-light.svg";

// // active light icons for dark footer
// import ActiveBookmarkLight from '@/Images/Icons/bookmark-active-light.svg';
// import ActiveLikeLight from '@/Images/Icons/like-active-light.svg';

// //logo
// import HotAndCoolLogo from '@/Images/Icons/hot-and-cool-logo.png';


// //API
// import GetAccessTokenAPI from "@/apis/auth/GetAccessToken";
// import FlixBlogSaveApi from "@/apis/flix/FlixBlogSaveApi";
// import FlixBlogLikeApi from "@/apis/flix/FlixBlogLikeApi";
// import FlixBlogFetchLikeAndSave from "@/apis/flix/FlixBlogFetchLikeAndSave";


// const FlixFooter = ({ positionValue, isLogo = false, modalVisible,setModalVisible, title, url,id, videoId, }) => {

//   const [isBookmarkActive, setIsBookmarkActive] = useState(false);
//   const [isLikeActive, setIsLikeActive] = useState(false);

//   const router = useRouter();

//   let [accessToken, setAccessToken] = useState(); // let[gettingAccessToken,setGettingAccessToken]=useState(true);

//   useEffect(() => {
//     getAccessToken();
//   }, [modalVisible])

//   // getting access token
//   function getAccessToken() {
//     GetAccessTokenAPI()
//       .then((response) => {
//         // console.log(response);
//         // if (response && 'message' in response && response.message === 'Refresh token is missing!') {
//         //   window.location.href = '/auth/user-auth';
//         // }
//         if (response && 'access_token' in response) {
//           setAccessToken(response.access_token);
//         }

//       })
//       .catch(() => {

//       })
//   } 

//   // for fecth likes and save
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     if (accessToken) {
//   //       if (id) {
//   //         await fetchLikedAndSavedBlogs(accessToken, id);
//   //       }
//   //       if (videoId) {
//   //         await fetchLikedAndSavedBlogs(accessToken, videoId);
//   //       }
//   //     }
//   //   };
  
//   //   fetchData();
//   // }, [accessToken, id, videoId]);
  


//   //hide footer if access token not found
//   // if (!accessToken) {
//   //   return (<></>)
//   // }

//   // //fetch like and saved blogs
//   async function fetchLikedAndSavedBlogs(accessToken,id) {

//     try {
//       console.log(accessToken,"accessToken in fetchLikedAndSavedBlogs ")
//       const response = await FlixBlogFetchLikeAndSave(accessToken);

//       // console.log("from fetch all",response);
  
//       // Find the specific content by ID
//       const result = response.liked_and_saved_videos.find(
//         (item) => item.content_id === id 
//       );


//       if (result) {
//         console.log("item.liked:", result.liked, "item.saved:", result.saved);
  
//         // Update states based on the response
//         setIsLikeActive(result.liked);
//         console.log("activelike", isLikeActive);
//         setIsBookmarkActive(result.saved);
//         console.log("activebookmark", isBookmarkActive);
//       } else {
//         console.log("No item found with the given blog id:", id);
//       }

//     } catch (error) {
//       console.error("Error fetching liked and saved blogs:", error);
//     }
//   }

//   //fetch like and saved videos
//   //  async function fetchLikedAndSavedBlogs(accessToken,videoId) {

//   //   try {
//   //     console.log(accessToken,"accessToken in fetchLikedAndSavedBlogs ")
//   //     const response = await FlixBlogFetchLikeAndSave(accessToken);
//   //     console.log("from fetch boy",response);
  
//   //     // Find the specific content by ID
//   //     const result = response.liked_and_saved_videos.find(
//   //       (item) => item.video_id === videoId 
//   //     );
      
  
//   //     if (result) {
//   //       console.log("item.liked:", result.liked, "item.saved:", result.saved);
  
//   //       // Update states based on the response
//   //       setIsLikeActive(result.liked);
//   //       console.log("activelike", isLikeActive);
//   //       setIsBookmarkActive(result.saved);
//   //       console.log("activebookmark", isBookmarkActive);
//   //     } else {
//   //       console.log("No item found with the given id:", videoId);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching liked and saved blogs:", error);
//   //   }
//   // }

 

  
//   // SAVE blog api call
//   function saveFlixBlog() {
   
//     if (!accessToken) {
//       router.push('/auth/user-auth');
//     }

//     let obj = {
//       'content_id': id,
//       'video_id':videoId,
//       "saved": !isBookmarkActive,
//     }

//     FlixBlogSaveApi(obj, accessToken)
//       .then((response) => {
//         console.log("response",response);
//         if (response) {
//           const isSaved = response.saved;
//           isSaved? setIsBookmarkActive(true):setIsBookmarkActive(false);
//           const toastMessage = response.saved ? "Added to Saved Flix" : "Removed from Saved";
//           NotificationDemo(toastMessage,isSaved); // Show toast with the appropriate message
//           fetchLikedAndSavedBlogs(accessToken,id);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   // LIKE blog api call
//   function likeFlixBlog() {

//     if (!accessToken) {
//       router.push('/auth/user-auth');
//     }

//     let obj = {
//       'content_id': id,
//       'video_id':videoId,
//       "liked": !isLikeActive,
//     }

//     FlixBlogLikeApi(obj, accessToken)
//       .then((response) => {
//         console.log("response", response);
//         if (response) {
//           const isLiked = response.liked;
//           isLiked ? setIsLikeActive(true) : setIsLikeActive(false);
//           const toastMessage = response.liked ? "Liked" : "Unliked";
//           NotificationDemo(toastMessage, isLiked); // Show toast with the appropriate message
//           fetchLikedAndSavedBlogs(accessToken,id );
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   const handleBack = async() => {
//     if (setModalVisible) {
//       setModalVisible("animate-slide-out");
//       fetchLikedAndSavedBlogs(accessToken,id );
//       setTimeout(() => {
//         setModalVisible(false); // Hide the modal
//       }, 1300);
//       return;
//     }
//     router.push("/");
//   };

//   return (

//     <footer className={`${positionValue} bottom-0 pb-10 w-full z-[3] `}>

//       {/* Save / Like MODAL */}
//       <FlixToaster/>

//       {/* Back Button */}
//       <button onClick={handleBack} type="button" className={`absolute z-[1] left-1/2 transform -translate-x-1/2 -ml-[120px] flex items-center justify-center gap-8 p-3 rounded-[90px] cursor-pointer flix-footer-dark-fradient footer-border-dark `}>
//         <Image src={ArrowLeft} width={24} height={24} alt="img" quality={100} />
//       </button>


//       {/* Action Buttons */}
//       <div className={`relative flex justify-center items-center`}>

//         <section className={`flex gap-6 px-5 py-3 rounded-[90px] flix-footer-dark-fradient footer-border-dark`} >

//           <button aria-label="Bookmark" onClick={saveFlixBlog} type="button" >
//             <Image src={isBookmarkActive ? ActiveBookmarkLight : BookmarkLight}
//               width={24} height={24} alt="Bookmark" quality={100} />
//           </button>

//           <button aria-label="Like" onClick={likeFlixBlog} type="button" >
//             <Image src={isLikeActive ? ActiveLikeLight : LikeLight}
//               width={24} height={24} alt="Like" quality={100} />
//           </button>

//           <FlixShareButton title={title} url={url} />

//         </section>

//         {/* hot and cool Logo */}
//         {isLogo && <div className=" absolute  z-10 left-1/2 transform translate-x-1/2 ml-16   flex justify-center items-center ">
//         {/* ml-16 */}
//           <Image src={HotAndCoolLogo} width={53} height={40} alt="hot&cool" quality={100} className=" object-center object-cover" />
//         </div>}

//       </div>

//     </footer>
//   );
// };

// export default FlixFooter;









//original code
// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// //components
// import FlixShareButton from "./FlixShareButton";
// import NotificationDemo, { FlixToaster } from "./FlixToaster";

// //icons
// import ArrowLeft from '@/Images/Icons/arrow-left.svg';
// import BookmarkLight from "@/Images/Icons/bookmark-light.svg";
// import LikeLight from "@/Images/Icons/like-light.svg";

// // active light icons for dark footer
// import ActiveBookmarkLight from '@/Images/Icons/bookmark-active-light.svg';
// import ActiveLikeLight from '@/Images/Icons/like-active-light.svg';

// //logo
// import HotAndCoolLogo from '@/Images/Icons/hot-and-cool-logo.png';


// //API
// import GetAccessTokenAPI from "@/apis/auth/GetAccessToken";
// import FlixBlogSaveApi from "@/apis/flix/FlixBlogSaveApi";
// import FlixBlogLikeApi from "@/apis/flix/FlixBlogLikeApi";
// import FlixBlogFetchLikeAndSave from "@/apis/flix/FlixBlogFetchLikeAndSave";


// const FlixFooter = ({ positionValue, isLogo = false, modalVisible,setModalVisible, title, url,id }) => {

//   const [isBookmarkActive, setIsBookmarkActive] = useState(false);
//   const [isLikeActive, setIsLikeActive] = useState(false);

//   const router = useRouter();

//   let [accessToken, setAccessToken] = useState(); // let[gettingAccessToken,setGettingAccessToken]=useState(true);

//   useEffect(() => {
//     getAccessToken();
//   }, [])

//   // getting access token
//   function getAccessToken() {
//     GetAccessTokenAPI()
//       .then((response) => {
//         // console.log(response);
//         // if (response && 'message' in response && response.message === 'Refresh token is missing!') {
//         //   window.location.href = '/auth/user-auth';
//         // }
//         if (response && 'access_token' in response) {
//           setAccessToken(response.access_token);
//           console.log(response.access_token)
//         }

//       })
//       .catch(() => {

//       })
//   } 

//   // for fecth likes and save
//   useEffect(() => {
//     if (accessToken) {
//       console.log(accessToken,"accessToken")
//       fetchLikedAndSavedBlogs(accessToken,id);
//     }
//   }, [accessToken]);

//   useEffect(() => {

//       fetchLikedAndSavedBlogs(accessToken,id);
//   }, [modalVisible]);

  
//   //hide footer if access token not found
//   // if (!accessToken) {
//   //   return (<></>)
//   // }

//   //fetch like and saved 
//   async function fetchLikedAndSavedBlogs(accessToken,id) {

//     console.log("from fetch",accessToken);
//     try {
//       console.log(accessToken,"accessToken in fetchLikedAndSavedBlogs ")
//       const response = await FlixBlogFetchLikeAndSave(accessToken);
//       // console.log(response, "response");
  
//       // Find the specific content by ID
//       const result = response.liked_and_saved_videos.find(
//         (item) => item.content_id === id
//       );
  
//       if (result) {
//         console.log("item.liked:", result.liked, "item.saved:", result.saved);
  
//         // Update states based on the response
//         setIsLikeActive(result.liked);
//         console.log("activelike", isLikeActive);
//         setIsBookmarkActive(result.saved);
//         console.log("activebookmark", isBookmarkActive);
//       } else {
//         console.log("No item found with the given id:", id);
//       }
//     } catch (error) {
//       console.error("Error fetching liked and saved blogs:", error);
//     }
//   }
 
//   // SAVE blog api call
//   function saveFlixBlog() {
//     console.log("insaveflixblog");

//     if (!accessToken) {
//       router.push('/auth/user-auth');
//     }

//     let obj = {
//       'content_id': id,
//       "saved": !isBookmarkActive,
//     }

//     FlixBlogSaveApi(obj, accessToken)
//       .then((response) => {
//         console.log("response",response);
//         if (response) {
//           const isSaved = response.saved;
//           isSaved? setIsBookmarkActive(true):setIsBookmarkActive(false);
//           const toastMessage = response.saved ? "Added to Saved Flix" : "Removed from Saved";
//           NotificationDemo(toastMessage,isSaved); // Show toast with the appropriate message
//           fetchLikedAndSavedBlogs(accessToken,id);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   // LIKE blog api call
//   function likeFlixBlog() {

//     if (!accessToken) {
//       router.push('/auth/user-auth');
//     }

//     let obj = {
//       'content_id': id,
//       "liked": !isLikeActive,
//     }

//     FlixBlogLikeApi(obj, accessToken)
//       .then((response) => {
//         console.log("response", response);
//         if (response) {
//           const isLiked = response.liked;
//           isLiked ? setIsLikeActive(true) : setIsLikeActive(false);
//           const toastMessage = response.liked ? "Liked" : "Unliked";
//           NotificationDemo(toastMessage, isLiked); // Show toast with the appropriate message
//           fetchLikedAndSavedBlogs(accessToken,id );
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   const handleBack = async() => {
//     if (setModalVisible) {
//       setModalVisible("animate-slide-out");
//       fetchLikedAndSavedBlogs(accessToken,id );
//       setTimeout(() => {
//         setModalVisible(false); // Hide the modal
//       }, 1300);
//       return;
//     }
//     router.push("/");
//   };

//   return (

//     <footer className={`${positionValue} bottom-0 pb-10 w-full `}>

//       {/* Save / Like MODAL */}
//       <FlixToaster/>

//       {/* Back Button */}
//       <button onClick={handleBack} type="button" className={`absolute z-[1] left-1/2 transform -translate-x-1/2 -ml-[120px] flex items-center justify-center gap-8 p-3 rounded-[90px] cursor-pointer flix-footer-dark-fradient footer-border-dark `}>
//         <Image src={ArrowLeft} width={24} height={24} alt="img" quality={100} />
//       </button>


//       {/* Action Buttons */}
//       <div className={`relative flex justify-center items-center`}>

//         <section className={`flex gap-6 px-5 py-3 rounded-[90px] flix-footer-dark-fradient footer-border-dark`} >

//           <button aria-label="Bookmark" onClick={saveFlixBlog} type="button" >
//             <Image src={isBookmarkActive ? ActiveBookmarkLight : BookmarkLight}
//               width={24} height={24} alt="Bookmark" quality={100} />
//           </button>

//           <button aria-label="Like" onClick={likeFlixBlog} type="button" >
//             <Image src={isLikeActive ? ActiveLikeLight : LikeLight}
//               width={24} height={24} alt="Like" quality={100} />
//           </button>

//           <FlixShareButton title={title} url={url} />

//         </section>

//         {/* hot and cool Logo */}
//         {isLogo && <Image src={HotAndCoolLogo} width={53} height={40} alt="hot&cool" quality={100} className="absolute z-10 left-1/2 transform translate-x-1/2 ml-16" />}

//       </div>

//     </footer>
//   );
// };

// export default FlixFooter;


