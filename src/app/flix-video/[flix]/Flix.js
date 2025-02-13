"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

//Lottie
import Lottie from "lottie-react";
import Play from '@/lottie/tap-to-play.json';

// icons
import MuteIcon from "@/Images/Icons/volume-mute.svg";
import UnmuteIcon from "@/Images/Icons/volume-on-icon.svg";
import PlayIcon from "@/Images/Icons/play-icon.svg";
import PauseIcon from "@/Images/Icons/pause-icon.svg";

// components
import Hls from "hls.js";
import FlixFooter from '@/Components/FlixFooter';

// import { SpinningText } from "@/Components/ui/spinning-text";

import PropTypes from 'prop-types';

const Flix = ({ playbackId, videoTitle ,thumbnail,accessToken}) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(true); // Control visibility state
    const videoRef = useRef(null);
    const hideTimeoutRef = useRef(null);
    const controlTimeoutRef = useRef(null);  // Added controlTimeoutRef for handling the controls timeout

    const videoSrc = `https://stream.mux.com/${playbackId}.m3u8`;

    // const thumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.png`;

    useEffect(() => {
        const video = videoRef.current;

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video);

            // hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());

            return () => hls.destroy(); // Cleanup HLS instance
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = videoSrc;
            video.load();
        }

         // Explicitly return undefined to satisfy ESLint
    return undefined;
    }, [playbackId]);

    const handleMuteToggle = useCallback(
        () => {
            const video = videoRef.current;
            if (video) {
                video.muted = !video.muted;
                setIsMuted(video.muted);
            }
        },[isMuted]
    );

    // Play/Pause toggle and control visibility
    const handlePlayPauseToggle = useCallback(() => {
        const video = videoRef.current;
        if (video) {
            if (video.paused) {
                video.play();
                setIsPlaying(true);
            } else {
                video.pause();
                setIsPlaying(false);
            }
        }
    
        // Show controls temporarily
        setShowControls(true);
        clearTimeout(controlTimeoutRef.current); // Clear existing timeout
    
        // Hide controls after 1 second only if the video is playing
        if (video?.paused === false) {
            controlTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, 600);
        }
    }, [isPlaying,showControls]);
    

    // Cleanup timeout on component unmount
    useEffect(() => {
        return () => {
            clearTimeout(controlTimeoutRef.current);
            return undefined; // Makes ESLint happy
        };
    }, []);

    
    useEffect(() => {
        const video = videoRef.current;
    
        if (video) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !isPlaying) {
                            setIsPlaying(false);
                            setShowControls(true);
                        }
                        else {
                        video.pause();
                    }
                    });
                },
                { threshold: 0.5 }
            );
    
            observer.observe(video);
    
            return () => observer.disconnect();
        }

        return undefined; // Explicitly return undefined to satisfy ESLint
        
    }, []); 
    
    

    useEffect(() => {
        return () => clearTimeout(hideTimeoutRef.current);
    }, []);

    const handleVideoEnd = useCallback(
        () => {
            if (videoRef.current) {
                videoRef.current.currentTime = 0; // Reset to the start
                setIsPlaying(false);
                setShowControls(true);
            }
        },[isPlaying,showControls]
    );


    const title = videoTitle;
    const url = `/flix-video/${playbackId}`;

    return (        
        <article className=" w-full h-full flex justify-center ">
            <div className="page-center-parent-container h-[100dvh] overflow-x-hidden snap-start snap-always relative">

                <video
                    ref={videoRef}
                    className="h-full w-full object-cover aspect-video"
                    onClick={handlePlayPauseToggle}
                    muted={isMuted}
                    poster={thumbnail}
                    playsInline //for ios devices to not play video in native player
                    loop={false} // Ensure loop is off to trigger onEnded
                    onEnded={handleVideoEnd}
                >
                    <source src={videoSrc} type="application/x-mpegURL" />
                </video>


                {/* flix video title */}
                {!isPlaying && <section className="w-full absolute bottom-[17%] bg-[flix-video-title-gradient] ">
                    <div className=" gap-14 flex flex-col items-center  ">
                        <h1 className="heading-h1 custom-text-white text-center mx-6 z-[3] ">{videoTitle}</h1>
                    </div>
                </section>}

                <FlixFooter positionValue="absolute" isLogo={true} title={title} url={url} videoId={playbackId} />

                {/* Mute/Unmute Button */}
                <button onClick={handleMuteToggle} className={`absolute z-[3] ${accessToken? " top-5" :"top-[4.3125rem]"}  right-5 gap-8 p-2 rounded-full flix-footer-dark-fradient footer-border-dark flex items-center justify-center `} >
                    <Image src={isMuted ? MuteIcon : UnmuteIcon} width={16} height={16} alt={isMuted ? "Muted" : "Unmuted"} />
                </button>   

                  {/* video gradient */}
                 {!isPlaying && <div className="bg-[#1A19174D] h-full absolute top-0 left-0 w-full z-0"></div>}

                {/* Play/Pause Button */}
                {showControls && (
                    <button onClick={handlePlayPauseToggle} className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[3]`} >
                       {/* <SpinningText radius={4} fontSize={1.2} className='body-bold custom-text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[3] '>{`Tap to play • Tap to play • Tap to play • `}</SpinningText> */}
                       {/* <SpinningText radius={5} fontSize={0.875} className="custom-text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[3]">• Tap to play • Tap to play • Tap to play </SpinningText> */}
            
                      
                       {/* <Lottie animationData={tapTopPlay}    loop={true} autoplay={true} /> */}
                       {/* <Lottie animationData={Play} loop={true} autoPlay={true} className=""/> */}
                       {/* <Lottie animationData={Arrow} loop={true}/> */}
                     
                       {/* <DotLottieReact src="https://lottie.host/e79afd80-6177-4162-a842-09d6e7754eb2/mdXFkQaHKI.lottie" loop autoplay/> */}
                       {/* <Lottie animationData={Play} loop={true} />
                       <Image src={isPlaying ? PauseIcon : PlayIcon} width={72} height={72} alt={isPlaying ? "Pause" : "Play"} /> */}

                       <div className="flex flex-col justify-center items-center gap-4">
                          <Lottie animationData={Play} loop={true} />
                          <Image src={isPlaying ? PauseIcon : PlayIcon} width={72} height={72}  alt={isPlaying ? "Pause" : "Play"} className="-mt-[103px]"/>
                       </div>

                    </button>
                )}

            </div>

        </article>
    );
};

export default Flix;


Flix.propTypes={
    playbackId:PropTypes.any,
    videoTitle:PropTypes.any,
    thumbnail:PropTypes.any,
    accessToken:PropTypes.any,
};

//28 dec as per design
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";

// import { Plus_Jakarta_Sans } from "next/font/google";

// const plus_jakarta_sans = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   display: "swap",
// });

// // icons
// import MuteIcon from "@/Images/Icons/volume-mute.svg";
// import UnmuteIcon from "@/Images/Icons/volume-on-icon.svg";
// import PlayIcon from "@/Images/Icons/play-icon.svg";
// import PauseIcon from "@/Images/Icons/pause-icon.svg";

// // components
// import Hls from "hls.js";
// import FlixFooter from '@/Components/FlixFooter';

// const Flix = ({ playbackId, videoTitle ,thumbnail,accessToken}) => {
//     const [isMuted, setIsMuted] = useState(false);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [showControls, setShowControls] = useState(true); // Control visibility state
//     const videoRef = useRef(null);
//     const hideTimeoutRef = useRef(null);
//     const controlTimeoutRef = useRef(null);  // Added controlTimeoutRef for handling the controls timeout

//     const videoSrc = `https://stream.mux.com/${playbackId}.m3u8`;

//     // const thumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.png`;

//     useEffect(() => {
//         const video = videoRef.current;

//         if (Hls.isSupported()) {
//             const hls = new Hls();
//             hls.loadSource(videoSrc);
//             hls.attachMedia(video);

//             // hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());

//             return () => hls.destroy();
//         } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
//             video.src = videoSrc;
//             video.load();
//         }
//     }, [playbackId]);

//     const handleMuteToggle = () => {
//         const video = videoRef.current;
//         if (video) {
//             video.muted = !video.muted;
//             setIsMuted(video.muted);
//         }
//     };

//     // Play/Pause toggle and control visibility
//     const handlePlayPauseToggle = () => {
//         const video = videoRef.current;
//         if (video) {
//             if (video.paused) {
//                 video.play();
//                 setIsPlaying(true);
//             } else {
//                 video.pause();
//                 setIsPlaying(false);
//             }
//         }

//         // Show controls temporarily
//         setShowControls(true);
//         clearTimeout(controlTimeoutRef.current); // Clear existing timeout

//         // Hide controls after 1 second only if the video is playing
//         if (video?.paused === false) {
//             controlTimeoutRef.current = setTimeout(() => {
//                 setShowControls(false);
//             }, 600);
//         }
//     };

//     // Cleanup timeout on component unmount
//     useEffect(() => {
//         return () => clearTimeout(controlTimeoutRef.current);
//     }, []);

//     useEffect(() => {
//         const video = videoRef.current;
    
//         if (video) {
//             const observer = new IntersectionObserver(
//                 (entries) => {
//                     entries.forEach((entry) => {
//                         if (entry.isIntersecting && !isPlaying) {
//                             setIsPlaying(false);
//                             setShowControls(true);
//                         }
//                         else {
//                         video.pause();
//                     }
//                     });
//                 },
//                 { threshold: 0.5 }
//             );
    
//             observer.observe(video);
    
//             return () => observer.disconnect();
//         }
//     }, []); 
    
    

//     useEffect(() => {
//         return () => clearTimeout(hideTimeoutRef.current);
//     }, []);

//     const handleVideoEnd = () => {
//         if (videoRef.current) {
//             videoRef.current.currentTime = 0; // Reset to the start
//             setIsPlaying(false);
//             setShowControls(true);
//         }
//     };


//     const title = videoTitle;
//     const url = `/flix-video/${playbackId}`;

//     return (        
//         <article className=" w-full h-full flex justify-center ">
//             <div className="page-center-parent-container h-[100dvh] overflow-x-hidden snap-start snap-always relative">

//                 <video
//                     ref={videoRef}
//                     className="h-full w-full object-cover min-w-[200px] aspect-video"
//                     onClick={handlePlayPauseToggle}
//                     muted={isMuted}
//                     poster={thumbnail}
//                     playsInline //for ios devices to not play video in native player
//                     webkit-playsinline //for ios devices to not play video in native player
//                     loop={false} // Ensure loop is off to trigger onEnded
//                     onEnded={handleVideoEnd}
//                 >
//                     <source src={videoSrc} type="application/x-mpegURL" />
//                 </video>


//                 {/* flix video title */}
//                 {!isPlaying && <section className="w-full absolute bottom-[17%] bg-[flix-video-title-gradient] ">
//                     <div className=" gap-14 flex flex-col items-center  ">
//                         <h1 className={"heading-h1 custom-text-white text-center mx-6 z-[3] " + plus_jakarta_sans}>{videoTitle}</h1>
//                     </div>
//                 </section>}

//                 <FlixFooter positionValue="absolute" isLogo={true} title={title} url={url} videoId={playbackId} />

//                 {/* Mute/Unmute Button */}
//                 <button onClick={handleMuteToggle} className={`absolute z-[3] ${accessToken? " top-5" :"top-[4.3125rem]"}  right-5 gap-8 p-2 rounded-full flix-footer-dark-fradient footer-border-dark flex items-center justify-center `} >
//                     <Image src={isMuted ? MuteIcon : UnmuteIcon} width={16} height={16} alt={isMuted ? "Muted" : "Unmuted"} />
//                 </button>
               

//                   {/* video gradient */}
//                  {!isPlaying && <div className="bg-[#1A19174D] h-full absolute top-0 left-0 w-full z-0"></div>}

//                 {/* Play/Pause Button */}
//                 {showControls && (
//                     <button onClick={handlePlayPauseToggle} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[3]" >
//                         <Image src={isPlaying ? PauseIcon : PlayIcon} width={72} height={72} alt={isPlaying ? "Pause" : "Play"} />
//                     </button>
//                 )}

//             </div>

//         </article>
//     );
// };

// export default Flix;



//25 dec
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";

// import { Plus_Jakarta_Sans } from "next/font/google";

// const plus_jakarta_sans = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   display: "swap",
// });

// // icons
// import MuteIcon from "@/Images/Icons/volume-mute.svg";
// import UnmuteIcon from "@/Images/Icons/volume-on-icon.svg";
// import PlayIcon from "@/Images/Icons/play-icon.svg";
// import PauseIcon from "@/Images/Icons/pause-icon.svg";

// // components
// import Hls from "hls.js";
// import FlixFooter from '@/Components/FlixFooter';

// const FlixReelContent = ({ playbackId, videoTitle }) => {
//     const [isMuted, setIsMuted] = useState(false);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [showControls, setShowControls] = useState(false); // Control visibility state
//     const videoRef = useRef(null);
//     const hideTimeoutRef = useRef(null);
//     const controlTimeoutRef = useRef(null);  // Added controlTimeoutRef for handling the controls timeout

//     const videoSrc = `https://stream.mux.com/${playbackId}.m3u8`;

//     useEffect(() => {
//         const video = videoRef.current;

//         if (Hls.isSupported()) {
//             const hls = new Hls();
//             hls.loadSource(videoSrc);
//             hls.attachMedia(video);

//             hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());

//             return () => hls.destroy();
//         } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
//             video.src = videoSrc;
//             video.load();
//         }
//     }, [playbackId]);

//     const handleMuteToggle = () => {
//         const video = videoRef.current;
//         if (video) {
//             video.muted = !video.muted;
//             setIsMuted(video.muted);
//         }
//     };

//     // Play/Pause toggle and control visibility
//     const handlePlayPauseToggle = () => {
//         const video = videoRef.current;
//         if (video) {
//             if (video.paused) {
//                 video.play();
//                 setIsPlaying(true);
//             } else {
//                 video.pause();
//                 setIsPlaying(false);
//             }
//         }

//         // Show controls temporarily
//         setShowControls(true);
//         clearTimeout(controlTimeoutRef.current); // Clear existing timeout

//         // Hide controls after 1 second only if the video is playing
//         if (video?.paused === false) {
//             controlTimeoutRef.current = setTimeout(() => {
//                 setShowControls(false);
//             }, 600);
//         }
//     };

//     // Cleanup timeout on component unmount
//     useEffect(() => {
//         return () => clearTimeout(controlTimeoutRef.current);
//     }, []);

//     useEffect(() => {
//         const video = videoRef.current;

//         if (video) {
//             const observer = new IntersectionObserver(
//                 (entries) => {
//                     entries.forEach((entry) => {
//                         if (entry.isIntersecting) {
//                             video.play();
//                             setIsPlaying(true);
//                         } else {
//                             video.pause();
//                             setIsPlaying(false);
//                         }
//                     });
//                 },
//                 { threshold: 0.5 }
//             );

//             observer.observe(video);

//             return () => observer.disconnect();
//         }
//     }, []);

//     useEffect(() => {
//         return () => clearTimeout(hideTimeoutRef.current);
//     }, []);

//     const title = videoTitle;
//     const url = `/flix-video/${playbackId}`;

//     return (        
//         <article className=" w-full h-full flex justify-center ">
//             <div className="page-center-parent-container h-[100dvh] snap-start snap-always relative">

//                 <video
//                     ref={videoRef}
//                     className="h-full w-full object-cover min-w-[200px] aspect-video"
//                     onClick={handlePlayPauseToggle}
//                     preload="auto"
//                     playsInline
//                     muted={isMuted}
//                 >
//                     <source src={videoSrc} type="application/x-mpegURL" />
//                 </video>


                // {/* flix video title */}
                // {!isPlaying && <section className="w-full absolute bottom-[17%] bg-[flix-video-title-gradient] ">
                //     <div className=" gap-14 flex flex-col items-center  ">
                //         <h1 className={"heading-h1 custom-text-white text-center mx-6 z-10 " + plus_jakarta_sans}>{videoTitle}</h1>
                //     </div>
                // </section>}

                // <FlixFooter positionValue="absolute" isLogo={true} title={title} url={url} videoId={playbackId} />

                // {/* Mute/Unmute Button */}
                // <button onClick={handleMuteToggle} className="absolute top-8 right-6 w-12 h-12 gap-8 rounded-full p-2.5 flix-footer-dark-fradient footer-border-dark flex items-center justify-center z-[1]" >
                //     <Image src={isMuted ? MuteIcon : UnmuteIcon} width={40} height={40} alt={isMuted ? "Muted" : "Unmuted"} />
                // </button>

                //   {/* video gradient */}
                //  {!isPlaying && <div className="bg-[#1A19174D] h-full absolute top-0 left-0 w-full z-0"></div>}

                // {/* Play/Pause Icon */}
                // {showControls && (
                //     <button onClick={handlePlayPauseToggle} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" >
                //         <Image src={isPlaying ? PauseIcon : PlayIcon} width={72} height={72} alt={isPlaying ? "Pause" : "Play"} />
                //     </button>
                // )}

//             </div>

//         </article>
//     );
// };

// export default FlixReelContent;
