"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// Components
// import FlixNavbar from "@/Components/FlixNavbar";

import FlixBlogContent from "@/Components/FlixBlogContent";
import InitialPageLoadingAnimation from "@/Components/InitialPageLoadingAnimation";

//API
import GetAccessTokenAPI from "@/apis/auth/GetAccessToken";
import GetMuxVideosApi from "@/apis/flix/GetMuxVideosApi";
import Flix from "@/app/flix-video/[flix]/Flix";
import ScrollButtons from "@/Components/ScrollButtons";

const Page = () => {
  const scrollContainer = useRef(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const initialFetchDone = useRef(false); // Tracks if the first fetch is complete


  let [gettingAccessToken, setGettingAccessToken] = useState(true);
  let [accessToken, setAccessToken] = useState("");
  let router = useRouter();

  // Fetch data for a given page
  const getFlixData = useCallback(async () => {
    if (loading || !hasMore) {return;}

    setLoading(true);
    try {
      const response = await fetch(
        `https://strapi.payppy.app/api/flixes/?populate=*&pagination[page]=${page}&pagination[pageSize]=3&sort=updatedAt:desc`
      );
      const json = await response.json();

      const newItems = json?.data || [];
      // console.log("new items", newItems);
      setData((prevData) => [...prevData, ...newItems]);

      if (newItems.length < 3) {setHasMore(false);} // If fewer than 2 items are fetched, no more data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  }, [page, hasMore, loading]);

  // Load initial data (only once)
  useEffect(() => {
    if (initialFetchDone.current) {return;}
    initialFetchDone.current = true;
    getFlixData();

    getMuxVideos();
  }, []); // Run only once on mount

  // Handle infinite scroll
  const handleScroll = () => {
    if (!scrollContainer.current) {return;}

    const { scrollTop, scrollHeight, clientHeight } = scrollContainer.current;
    if (scrollTop + clientHeight >= scrollHeight - 50 && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Fetch data on page change (but skip initial render caused by `setPage`)
  useEffect(() => {
    if (page > 1) {
      getFlixData();
      getMuxVideos();
    }
  }, [page]);

  // Attach scroll listener
  useEffect(() => {
    const container = scrollContainer.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
  
      return () => container.removeEventListener("scroll", handleScroll);
    }
    return undefined;
  }, []);

  //get access token intially
  useEffect(() => {
    getAccessToken();
  }, []);

  function getAccessToken() {
    setGettingAccessToken(true);
    GetAccessTokenAPI()
      .then((response) => {
        if (response && "access_token" in response) {
          setAccessToken(response.access_token);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setGettingAccessToken(false);
      });
  }

  function getMuxVideos() {
    GetMuxVideosApi(page)
      .then(() => {
      })
      .catch(() => {});
  }

  //if click on login/signup button
  let handleLoginSignupClick=useCallback(()=>{
    router.push("/auth/user-auth");
  },[]);

  //base URL
  let baseUrl = process.env.STRAPI_ENDPOINT;

  //video thumbnnail url

  function getThumbnailImgUrl(data) {
    const imgName =
      data?.CoverImage?.formats?.large?.url ||
      data?.CoverImage?.formats?.medium?.url ||
      data?.CoverImage?.formats?.small?.url ||
      data?.CoverImage?.formats?.thumbnail.url;
    // console.log("data",data);
    // console.log("imgname",baseUrl+imgName);
    return imgName ? baseUrl + imgName : "";
  }

  return (
    <div className="w-full min-h-[100dvh] flex justify-center ">
      {/* snap-start snap-always --> used for scrolling inside flix home page */}

      <div className="relative page-center-parent-container overflow-scrollbar-hidden snap-start snap-always ">
        {!accessToken && !gettingAccessToken && (
          <button
            className="absolute top-0 w-full z-10 background-custom-green all-caps-12-bold custom-text-grey900 text-center py-4 small-border border-black "
            onClick={handleLoginSignupClick}
          >
            Login/SignuP
          </button>
        )}
        {/* Navbar */}
        {/* {navbar && <FlixNavbar />} */}

        <main
          ref={scrollContainer}
          className="w-full h-[100dvh] snap-y snap-mandatory overflow-y-scroll overflow-x-hidden overflow-scrollbar-hidden animate-scroll-up "
        >
          {data?.length > 0 &&
            data?.map((element, index) => (
              <React.Fragment key={index}>
                {!element?.mux_video_uploader_mux_asset ? (
                  <FlixBlogContent data={element} />
                ) : (
                  <Flix
                    index={index}
                    accessToken={accessToken}
                    thumbnail={getThumbnailImgUrl(element)}
                    playbackId={
                      element?.mux_video_uploader_mux_asset?.playback_id
                    }
                    videoTitle={element?.mux_video_uploader_mux_asset?.title}
                  />
                )}
              </React.Fragment>
            ))}
          {loading && <InitialPageLoadingAnimation />}
        </main>

        {/* Scroll Buttons */}
        <ScrollButtons containerName={scrollContainer} />
      </div>
    </div>
  );
};

export default Page;

// //original code
// "use client";
// import React, { useEffect, useRef, useState, useCallback } from "react";
// import { useRouter } from 'next/navigation';

// // Components
// // import FlixNavbar from "@/Components/FlixNavbar";
// import ScrollButtons from "@/Components/ScrollButtons";
// import FlixBlogContent from "@/Components/FlixBlogContent";
// import InitialPageLoadingAnimation from '@/Components/InitialPageLoadingAnimation';

// //API
// import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
// import GetMuxVideosApi from "@/apis/flix/GetMuxVideosApi";
// import FlixReelContent from "@/Components/FlixReelContent";

// const Page = ({ scrollButtons = true, navbar = true }) => {
//   const scrollContainer = useRef(null);
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const initialFetchDone = useRef(false); // Tracks if the first fetch is complete
//   let[muxVideos,setMuxVideos]=useState([]);

//   let [gettingAccessToken, setGettingAccessToken] = useState(true);
//   let [accessToken, setAccessToken] = useState('');
//   let router = useRouter();

//   // Fetch data for a given page
//   const getFlixData = useCallback(async () => {
//     if (loading || !hasMore) return;

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://strapi.payppy.app/api/flixes/?populate=*&pagination[page]=${page}&pagination[pageSize]=3&sort=createdAt:desc`
//       );
//       const json = await response.json();

//       const newItems = json?.data || [];
//       // console.log("new items", newItems);
//       setData((prevData) => [...prevData, ...newItems]);

//       if (newItems.length < 3) setHasMore(false); // If fewer than 3 items are fetched, no more data
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//     setLoading(false);
//   }, [page, hasMore, loading]);

//   // Load initial data (only once)
//   useEffect(() => {
//     if (initialFetchDone.current) return;
//     initialFetchDone.current = true;
//     getFlixData();

//     getMuxVideos();
//   }, []); // Run only once on mount

//   // Handle infinite scroll
//   const handleScroll = () => {
//     if (!scrollContainer.current) return;

//     const { scrollTop, scrollHeight, clientHeight } = scrollContainer.current;
//     if (scrollTop + clientHeight >= scrollHeight - 50 && hasMore && !loading) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   // Fetch data on page change (but skip initial render caused by `setPage`)
//   useEffect(() => {
//     if (page > 1) {
//       getFlixData();
//       getMuxVideos();
//     }
//   }, [page]);

//   // Attach scroll listener
//   useEffect(() => {
//     const container = scrollContainer.current;
//     if (!container) return;

//     container.addEventListener("scroll", handleScroll);
//     return () => container.removeEventListener("scroll", handleScroll);
//   }, []);

//     //get access token intially
//     useEffect(() => {
//       getAccessToken();
//   }, [])

//   function getAccessToken() {
//     setGettingAccessToken(true);
//     GetAccessTokenAPI()
//         .then((response) => {

//             if (response && 'access_token' in response) {
//                 setAccessToken(response.access_token);
//             }
//         })
//         .catch((error) => {
//             console.log(error);
//         })
//         .finally(()=>{
//             setGettingAccessToken(false);
//         }
//     )

// }

// function getMuxVideos()
// {
//  GetMuxVideosApi(page)
//  .then((response)=>{
//    if(response)
//    {
//      if('items' in response)
//      {
//        setMuxVideos(response?.items);
//      }
//    }
//  })
//  .catch(()=>{

//  })
// }

//   //if click on login/signup button
//   function handleLoginSignupClick() {
//     router.push('/auth/user-auth');
// }

//   return (

//     <main className=" w-full h-full flex justify-center ">

//       {/* snap-start snap-always --> used for scrolling inside flix home page */}
//       <div className="relative max-w-[52.7vh] overflow-scrollbar-hidden snap-start snap-always ">
//       {(!accessToken&&!gettingAccessToken) && <button className="absolute top-0 w-full  z-10 background-custom-green all-caps-12-bold custom-text-grey900  text-center py-4 small-border border-black " onClick={handleLoginSignupClick} >Login/SignuP</button>}
//         {/* Navbar */}
//         {/* {navbar && <FlixNavbar />} */}

//           <div ref={scrollContainer} className="w-full h-[100dvh] snap-y snap-mandatory overflow-y-scroll overflow-scrollbar-hidden animate-scroll-up ">
//             {data?.length > 0 &&
//               data?.map((element, index) => (
//                 <>
//                   <FlixBlogContent data={element} key={index} />
//                   {muxVideos.length-1>=index&&<FlixReelContent playbackId={muxVideos[index]?.playback_id} key={index}/>}
//                 </>
//               ))}
//             {loading && <InitialPageLoadingAnimation />}
//           </div>

//         {/* Scroll Buttons */}
//         {scrollButtons && <ScrollButtons containerName={scrollContainer} />}

//       </div>

//     </main>

//   );
// };

// export default Page;
