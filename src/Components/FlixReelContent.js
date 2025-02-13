"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Hls from "hls.js";
import FlixFooter from "./FlixFooter";

// Icons
import MuteIcon from "@/Images/Icons/volume-mute.svg";
import UnmuteIcon from "@/Images/Icons/volume-on-icon.svg";
import PlayIcon from "@/Images/Icons/play-icon.svg";
import PauseIcon from "@/Images/Icons/pause-icon.svg";

import PropTypes from 'prop-types';

const FlixReelContent = ({ playbackId, videoTitle}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true); // Default: Muted
    const [showControls, setShowControls] = useState(false); // Control visibility state
    const videoRef = useRef(null);
    const controlTimeoutRef = useRef(null); // Timeout reference for hiding controls

    const videoSrc = `https://stream.mux.com/${playbackId}.m3u8`;

    const title = "hi";

    // Initialize HLS or fallback for native HLS support
    useEffect(() => {
        const video = videoRef.current;

        if (Hls.isSupported() && video) {
            const hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play().catch(() => setIsPlaying(false));
            });

            return () => hls.destroy();
        } else if (video?.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = videoSrc;
            video.load();
            video.play().catch(() => setIsPlaying(false));
        }
        return undefined; // Explicitly return undefined to satisfy ESLint
    }, [videoSrc]);

    // Observe the video to play only when in the viewport
    useEffect(() => {
        const video = videoRef.current;
    
        if (video) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        video.play().then(() => {
                            setIsPlaying(true);
                            setIsMuted(false); // Unmute video
                            video.muted = false;
                        });
                    } else {
                        video.pause();
                        setIsPlaying(false);
                        video.muted = true; // Mute video
                        setIsMuted(true);
                    }
                },
                { threshold: 0.5 }
            );
    
            observer.observe(video);
    
            return () => observer.disconnect(); // Cleanup
        }
    
        return undefined; // Explicitly return undefined to satisfy ESLint
    }, []);
    

    // Mute/Unmute toggle
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
    const handlePlayPauseToggle = useCallback(
        () => {
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
                }, 1000);
            }
        },[isPlaying,showControls]
    );

    // Cleanup timeout on component unmount
    useEffect(() => {
        return () => clearTimeout(controlTimeoutRef.current);
    }, []);

    return (
        <section className="relative w-full h-full flex flex-col snap-start snap-always ">
            {/* Video Player */}
            <video
                ref={videoRef}
                className="h-full w-full object-cover min-w-[200px] aspect-video"
                muted={isMuted} // Dynamic mute state
                playsInline
                autoPlay
                loop
                preload="auto"
                onClick={handlePlayPauseToggle} // Tap to toggle play/pause
            >
                <source src={videoSrc} type="application/x-mpegURL" />
            </video>

            {/* Footer */}
            <FlixFooter
                positionValue="absolute"
                isLogo={true}
                // title={videoTitle}
                title={title}
                url={`/flix/${playbackId}`}
                videoId={playbackId}
            />

            {/* Mute/Unmute Button */}
            <button
                onClick={handleMuteToggle}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="absolute top-8 right-6 w-12 h-12 gap-8 rounded-full p-2.5 flix-footer-dark-fradient footer-border-dark flex items-center justify-center z-[1]"
            >
                <Image
                    src={isMuted ? MuteIcon : UnmuteIcon}
                    width={40}
                    height={40}
                    alt={isMuted ? "Muted" : "Unmuted"}
                />
            </button>

            {!isPlaying&&<div className="bg-[#1A19174D] h-full absolute top-0 left-0 w-full z-0"></div>}

            {/* Play/Pause Icon */}
            {showControls && (
                <button
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                    onClick={handlePlayPauseToggle}
                >
                    <Image
                        src={isPlaying ? PauseIcon : PlayIcon}
                        width={72}
                        height={72}
                        alt={isPlaying ? "Pause" : "Play"}
                    />
                </button>
            )}
        </section>
    );
};

export default FlixReelContent;

FlixReelContent.propTypes = {
    playbackId:PropTypes.any,
    videoTitle:PropTypes.any,
};

// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import Hls from "hls.js";
// import FlixFooter from "./FlixFooter";

// // Icons
// import MuteIcon from "@/Images/Icons/volume-mute.svg";
// import UnmuteIcon from "@/Images/Icons/volume-on-icon.svg";
// import PlayIcon from "@/Images/Icons/play-icon.svg";
// import PauseIcon from "@/Images/Icons/pause-icon.svg";

// const FlixReelContent = ({ playbackId, videoTitle}) => {
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [isMuted, setIsMuted] = useState(true); // Default: Muted
//     const [showControls, setShowControls] = useState(false); // Control visibility state
//     const videoRef = useRef(null);
//     const controlTimeoutRef = useRef(null); // Timeout reference for hiding controls

//     const videoSrc = `https://stream.mux.com/${playbackId}.m3u8`;

//     // Initialize HLS or fallback for native HLS support
//     useEffect(() => {
//         const video = videoRef.current;

//         if (Hls.isSupported() && video) {
//             const hls = new Hls();
//             hls.loadSource(videoSrc);
//             hls.attachMedia(video);

//             hls.on(Hls.Events.MANIFEST_PARSED, () => {
//                 video.play().catch(() => setIsPlaying(false));
//             });

//             return () => hls.destroy();
//         } else if (video?.canPlayType("application/vnd.apple.mpegurl")) {
//             video.src = videoSrc;
//             video.load();
//             video.play().catch(() => setIsPlaying(false));
//         }
//     }, [videoSrc]);

//     // Observe the video to play only when in the viewport
//     useEffect(() => {
//         const video = videoRef.current;

//         if (video) {
//             const observer = new IntersectionObserver(
//                 ([entry]) => {
//                     if (entry.isIntersecting) {
//                         video.play().then(() => {
//                             setIsPlaying(true);
//                             setIsMuted(false); // Unmute video
//                             video.muted = false;
//                         });
//                     } else {
//                         video.pause();
//                         setIsPlaying(false);
//                         video.muted = true; // Mute video
//                         setIsMuted(true);
//                     }
//                 },
//                 { threshold: 0.5 }
//             );

//             observer.observe(video);

//             return () => observer.disconnect();
//         }
//     }, []);

//     // Mute/Unmute toggle
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
//             }, 1000);
//         }
//     };

//     // Cleanup timeout on component unmount
//     useEffect(() => {
//         return () => clearTimeout(controlTimeoutRef.current);
//     }, []);

//     return (
//         <section className="relative w-full h-full flex flex-col snap-start snap-always">
//             {/* Video Player */}
//             <video
//                 ref={videoRef}
//                 className="h-full w-full object-cover min-w-[200px] aspect-video"
//                 muted={isMuted} // Dynamic mute state
//                 playsInline
//                 loop
//                 preload="auto"
//                 onClick={handlePlayPauseToggle} // Tap to toggle play/pause
//             >
//                 <source src={videoSrc} type="application/x-mpegURL" />
//             </video>

//             {/* Footer */}
//             <FlixFooter
//                 positionValue="absolute"
//                 isLogo={true}
//                 title={videoTitle}
//                 url={`/flix/${playbackId}`}
//                 videoId={playbackId}
//             />

//             {/* Mute/Unmute Button */}
//             <button
//                 onClick={handleMuteToggle}
//                 aria-label={isMuted ? "Unmute video" : "Mute video"}
//                 className="absolute top-8 right-6 w-12 h-12 gap-8 rounded-full p-2.5 flix-footer-dark-fradient footer-border-dark flex items-center justify-center z-[1]"
//             >
//                 <Image
//                     src={isMuted ? MuteIcon : UnmuteIcon}
//                     width={40}
//                     height={40}
//                     alt={isMuted ? "Muted" : "Unmuted"}
//                 />
//             </button>

//             {!isPlaying&&<div className="bg-[#1A19174D] h-full absolute top-0 left-0 w-full z-0"></div>}

//             {/* Play/Pause Icon */}
//             {showControls && (
//                 <button
//                     aria-label={isPlaying ? "Pause video" : "Play video"}
//                     className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
//                     onClick={handlePlayPauseToggle}
//                 >
//                     <Image
//                         src={isPlaying ? PauseIcon : PlayIcon}
//                         width={72}
//                         height={72}
//                         alt={isPlaying ? "Pause" : "Play"}
//                     />
//                 </button>
//             )}
//         </section>
//     );
// };

// export default FlixReelContent;




//final design
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import Hls from "hls.js";
// import FlixFooter from "./FlixFooter";

// // Icons
// import MuteIcon from "@/Images/Icons/volume-mute.svg";
// import UnmuteIcon from "@/Images/Icons/volume-on-icon.svg";
// import PlayIcon from "@/Images/Icons/play-icon.svg";
// import PauseIcon from "@/Images/Icons/pause-icon.svg";

// const FlixReelContent = ({ playbackId, videoTitle}) => {
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [isMuted, setIsMuted] = useState(true); // Default: Muted
//     const [showControls, setShowControls] = useState(false); // Control visibility state
//     const videoRef = useRef(null);
//     const controlTimeoutRef = useRef(null); // Timeout reference for hiding controls

//     const videoSrc = `https://stream.mux.com/${playbackId}.m3u8`;

//     // Initialize HLS or fallback for native HLS support
//     useEffect(() => {
//         const video = videoRef.current;

//         if (Hls.isSupported() && video) {
//             const hls = new Hls();
//             hls.loadSource(videoSrc);
//             hls.attachMedia(video);

//             hls.on(Hls.Events.MANIFEST_PARSED, () => {
//                 video.muted = true; // Start muted to comply with autoplay policies
//                 video.play().then(() => {
//                     setIsPlaying(true);
//                 }).catch(() => {
//                     console.warn("Autoplay failed");
//                     setIsPlaying(false);
//                 });
//             });

//             return () => hls.destroy();
//         } else if (video?.canPlayType("application/vnd.apple.mpegurl")) {
//             video.src = videoSrc;
//             video.load();
//             video.muted = true; // Start muted to comply with autoplay policies
//             video.play().then(() => {
//                 setIsPlaying(true);
//             }).catch(() => {
//                 console.warn("Autoplay failed");
//                 setIsPlaying(false);
//             });
//         }
//     }, [videoSrc]);

//     // Observe the video to play only when in the viewport
//     useEffect(() => {
//         const video = videoRef.current;

//         if (video) {
//             const observer = new IntersectionObserver(
//                 ([entry]) => {
//                     if (entry.isIntersecting) {
//                         video.play().then(() => {
//                             setIsPlaying(true);
//                             setIsMuted(true); // Unmute video
//                             video.muted = true;
//                         }).catch(() => {
//                             console.warn("Autoplay failed in viewport");
//                         });
//                     } else {
//                         video.pause();
//                         setIsPlaying(false);
//                         video.muted = true; // Mute video
//                         setIsMuted(true);
//                     }
//                 },
//                 { threshold: 0.5 }
//             );

//             observer.observe(video);

//             return () => observer.disconnect();
//         }
//     }, []);

//     // Mute/Unmute toggle
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

//     return (
//         <section className="relative w-full h-full flex flex-col snap-start snap-always">
//             {/* Video Player */}
//             <video
//                 ref={videoRef}
//                 className="h-full w-full object-cover min-w-[200px] aspect-video"
//                 muted={isMuted} // Dynamic mute state
//                 playsInline
//                 loop
//                 preload="auto"
//                 onClick={handlePlayPauseToggle} // Tap to toggle play/pause
//                 autoPlay // Added to ensure autoplay
//             >
//                 <source src={videoSrc} type="application/x-mpegURL" />
//             </video>

//             {/* Footer */}
//             <FlixFooter
//                 positionValue="absolute"
//                 isLogo={true}
//                 title={videoTitle}
//                 url={`/flix/${playbackId}`}
//                 videoId={playbackId}
//             />

//             {/* Mute/Unmute Button */}
//             <button
//                 onClick={handleMuteToggle}
//                 aria-label={isMuted ? "Unmute video" : "Mute video"}
//                className="absolute top-8 right-6 w-12 h-12 gap-8 rounded-full p-2.5 flix-footer-dark-fradient footer-border-dark flex items-center justify-center z-[1]"
//             >
//                 <Image
//                     src={isMuted ? MuteIcon : UnmuteIcon}
//                     width={40}
//                     height={40}
//                     alt={isMuted ? "Muted" : "Unmuted"}
//                 />
//             </button>

//             {!isPlaying&&<div className="bg-[#1A19174D] h-full absolute top-0 left-0 w-full z-0"></div>}

//             {/* Play/Pause Icon */}
//             {showControls && (
//                 <button
//                     aria-label={isPlaying ? "Pause video" : "Play video"}
//                     className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
//                     onClick={handlePlayPauseToggle}
//                 >
//                     <Image
//                         src={isPlaying ? PauseIcon : PlayIcon}
//                         width={72}
//                         height={72}
//                         alt={isPlaying ? "Pause" : "Play"}
//                     />
//                 </button>
//             )}
//         </section>
//     );
// };

// export default FlixReelContent;


//3 as per design
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";

// // icons
// import Mute from "@/Images/Icons/volume-mute.svg";
// import Unmute from "@/Images/Icons/volume-on-icon.svg";
// import Play from "@/Images/Icons/play-icon.svg";
// import Pause from "@/Images/Icons/pause-icon.svg";

// // components
// import Hls from "hls.js";
// import FlixFooter from "./FlixFooter";

// const FlixReelContent = ({ playbackId, videoTitle }) => {
//     const [isMuted, setIsMuted] = useState(true);
//     const [isPlaying, setIsPlaying] = useState(true);
//     const [showPlayIcon, setShowPlayIcon] = useState(false);
//     const videoRef = useRef(null);
//     const hideTimeoutRef = useRef(null);

//     const videoSrc = `https://stream.mux.com/${playbackId}.m3u8`;

//     useEffect(() => {
//     const video = videoRef.current;

//     if (Hls.isSupported()) {
//         const hls = new Hls();
//         hls.loadSource(videoSrc);
//         hls.attachMedia(video);

//         hls.on(Hls.Events.MANIFEST_PARSED, () => {
//             if (video) {
//                 video.play(); // Ensures autoplay after manifest is parsed
//             }
//         });

//         return () => hls.destroy();
//     } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
//         video.src = videoSrc;
//         video.load();
//         video.play(); // Ensures autoplay on platforms that support it
//     }
// }, [playbackId]);


//     const handleMuteToggle = () => {
//         const video = videoRef.current;
//         if (video) {
//             video.muted = !video.muted;
//             setIsMuted(video.muted);
//         }
//     };

//     const handlePlayToggle = () => {
//         const video = videoRef.current;
//         if (video) {
//             if (video.paused) {
//                 video.play();
//                 setIsPlaying(true);
//                 setShowPlayIcon(true);
//             } else {
//                 video.pause();
//                 setIsPlaying(false);
//                 setShowPlayIcon(false);

//             }
//         }
//     };

//     const handleVideoTap = () => {
//         setShowPlayIcon(true);
//         clearTimeout(hideTimeoutRef.current);

//         hideTimeoutRef.current = setTimeout(() => {
//             setShowPlayIcon(false);
//         }, 700);

//         handlePlayToggle();
//     };

//     useEffect(() => {
//         const video = videoRef.current;

//         if (video) {
//             const observer = new IntersectionObserver(
//                 (entries) => {
//                     entries.forEach((entry) => {
//                         if (entry.isIntersecting) {
//                             video.pause();
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
//     const url = `/flix/${playbackId}`;

//     return (
//         <section className="relative w-full h-full flex flex-col snap-start snap-always">
        
//             <video
//                 ref={videoRef}
//                 className="h-full w-full object-cover min-w-[200px] aspect-video"
//                 onClick={handleVideoTap}
//                 preload="auto"
//                 muted={isMuted}
//                 playsInline
//                 loop
//                 autoPlay
//             >
//                 <source src={videoSrc} type="application/x-mpegURL" />
//             </video>

//             <FlixFooter positionValue="absolute" isLogo={true} title={title} url={url} videoId={playbackId} />

//             {/* {showPlayIcon && ( */}
//                 <button
//                     onClick={handlePlayToggle}
//                     type="button"
//                     aria-label={isPlaying ? "Pause video" : "Play video"}
//                     className={`absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-[1] ${!showPlayIcon? 'opacity-100':'opacity-0'}`}
//                 >
//                     <Image src={!showPlayIcon ? Play: Pause } width={72} height={72} alt="img" quality={100} className="" />
//                 </button>

//                 {!showPlayIcon&&<div className="bg-[#1A19174D] h-full absolute top-0 left-0 w-full z-0"></div>}
//             {/* )} */}

//             {/* {showMuteIcon && ( */}
//                 <button
//                     onClick={handleMuteToggle}
//                     type="button"
//                     aria-label={isMuted ? "Unmute video" : "Mute video"}
//                     className="absolute top-8 right-6 w-12 h-12 gap-8 rounded-full p-2.5 flix-footer-dark-fradient footer-border-dark flex items-center justify-center z-[1]"
//                 >
//                     <Image src={isMuted ? Mute : Unmute} width={40} height={40} alt="" quality={100} />
//                 </button>
//             {/* )} */}
//         </section>
//     );
// };

// export default FlixReelContent;



//2
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";

// // icons
// import Mute from "@/Images/Icons/volume-mute.svg";
// import Unmute from "@/Images/Icons/volume-on-icon.svg";
// import Play from '@/Images/Icons/play-icon.svg';
// import Pause from '@/Images/Icons/pause-icon.svg';

// // components
// import Hls from "hls.js";
// import FlixFooter from "./FlixFooter";

// const FlixReelContent = ({ playbackId ,videoTitle}) => {
//     const [isMuted, setIsMuted] = useState(true);
//     const [showMuteIcon, setShowMuteIcon] = useState(false);
//     const [showPlayIcon,setShowPlayIcon] = useState(false);
//     const videoRef = useRef(null);
//     const hideTimeoutRef = useRef(null);

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

//     const handleVideoTap = () => {
//         setShowPlayIcon(true);
//         clearTimeout(hideTimeoutRef.current);

//         hideTimeoutRef.current = setTimeout(() => {
//             setShowPlayIcon(false);
//         }, 700);

//         handleMuteToggle();
//     };

//     useEffect(() => {
//         const video = videoRef.current;

//         if (video) {
//             const observer = new IntersectionObserver(
//                 (entries) => {
//                     entries.forEach((entry) => {
//                         if (entry.isIntersecting) {
//                             video.play(); 
//                         } else {
//                             video.pause();
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

//     // const title = items.title;
//     const title = videoTitle;
//     const url = `/flix-video/${playbackId}`;

//     return (
//         <section className="relative w-full h-full flex flex-col snap-start snap-always">
//             <video
//                 ref={videoRef}
//                 className="h-full w-full object-cover min-w-[200px] aspect-video"
//                 onClick={handleVideoTap}
//                 preload="auto"
//                 muted={isMuted}
//                 playsInline
//                 loop
//             >
//                 <source src={videoSrc} type="application/x-mpegURL" />
//             </video>

//             <FlixFooter positionValue="absolute" isLogo={true} title={title} url={url} videoId={playbackId} />

//             {showPlayIcon && (
//                 <button
//                     onClick={handlePlayToggle}
//                     type="button"
//                     aria-label={isMuted ? "Unmute video" : "Mute video"}
//                     className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12  gap-8 rounded-full  p-6 flix-footer-dark-fradient footer-border-dark  flex items-center justify-center"
//                 >
//                     <Image src={showPlayIcon ? Play : Pause} width={72} height={72} alt="" quality={100} />
//                 </button>
//             )}

//             {showMuteIcon && (
//                 <button
//                     onClick={handleMuteToggle}
//                     type="button"
//                     aria-label={isMuted ? "Unmute video" : "Mute video"}
//                     className="absolute top-8 right-6 w-12 h-12  gap-8 rounded-full p-2.5 flix-footer-dark-fradient footer-border-dark  flex items-center justify-center"
//                 >
//                     <Image src={isMuted ? Mute : Unmute} width={40} height={40} alt="" quality={100} />
//                 </button>
//             )}

//         </section>
//     );
// };

// export default FlixReelContent;









//original code
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";


// //icons
// import muteIcon from "@/Images/Icons/volume-mute.svg";
// import unmuteIcon from "@/Images/Icons/volume-unmute.svg";

// //components
// import MuxPlayer from "@mux/mux-player-react";
// import Hls from "hls.js";
// import FlixReelFooter from "./FlixReelFooter";


// const FlixReelContent = ({ playbackId }) => {
//   const [isMuted, setIsMuted] = useState(true);
//   const [showMuteIcon, setShowMuteIcon] = useState(false); // State to control visibility of mute button
//   const videoRef = useRef(null);
//   const hideTimeoutRef = useRef(null); // Ref to keep track of timeout


//   const videoSrc = `https://stream.mux.com/${playbackId}.m3u8`;


//   useEffect(() => {
//     const video = videoRef.current;

//     if (Hls.isSupported()) {
//       const hls = new Hls();
//       hls.loadSource(videoSrc);
//       hls.attachMedia(video);

//       hls.on(Hls.Events.MANIFEST_PARSED, () => {
//         video.play();
//       });

//       return () => {
//         hls.destroy();
//       };
//     } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
//       // Native HLS support (e.g., Safari)
//       video.src = videoSrc;
//     }
//   }, [playbackId]);

//   const handleMuteToggle = () => {
//     const video = videoRef.current;
//     if (video) {
//       video.muted = !video.muted;
//       setIsMuted(video.muted);
//     }
//   };

//   const handleVideoTap = () => {

//     setShowMuteIcon(true);  // Show the mute/unmute icon when tapped

//     clearTimeout(hideTimeoutRef.current);  // Reset the timer to hide the icon after 5 seconds

//     hideTimeoutRef.current = setTimeout(() => {
//       setShowMuteIcon(false); // Hide the icon after 5 seconds
//     }, 700);

//     handleMuteToggle();  // Toggle mute/unmute
//   };

//   useEffect(() => {
//     const video = videoRef.current;

//     if (video) {
//       const observer = new IntersectionObserver(
//         (entries) => {
//           entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//               video.play();
//               video.muted=false;
//             } else {
//               video.pause();
//             }
//           });
//         },
//         {
//           threshold: 0.5, // Trigger when 50% of the video is in view
//         }
//       );

//       observer.observe(video);

//       return () => observer.disconnect();
//     }
//   }, []);

//   useEffect(() => {
//     return () => clearTimeout(hideTimeoutRef.current); // Cleanup timeout on unmount
//   }, []);

//   return (
//     <section className="relative w-full h-full flex flex-col snap-start snap-always">
//       <video ref={videoRef} className="h-full w-full object-cover min-w-[200px] aspect-video" onClick={handleVideoTap}
//         preload="auto"
//         playsInline muted={isMuted}
//         loop
//       >
//         <source src={videoSrc} type="video/mp4" />
//       </video>
//       {/* <MuxPlayer
//           // streamType="on-demand"
//           playbackId="ryqHJt01Y77vqKbCRNFUXwdFNonyH4sXMdhVoAeknu1k"
//           metadataVideoTitle="Placeholder (optional)"
//           metadataViewerUserId="Placeholder (optional)"
//           primaryColor="trasparent"
//           secondaryColor="trasparent"
//           className="h-full w-full object-cover min-w-[200px] aspect-video"
//           autoPlay={true}
//           loop={true}
//           muted={true}
//         /> */}

//       {/* footer */}
//       {/* <FlixFooter backOption="/" positionValue="absolute" mode="" /> */}

//       <FlixReelFooter positionValue="absolute"/>

//       {/* Conditionally render the Mute/Unmute Button */}
//       {showMuteIcon && (
//         <button onClick={handleMuteToggle} type="button"
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 gap-2.5 p-3 rounded-[2px] backdrop-blur-[12px] flex items-center justify-center"
//         >
//           <Image src={isMuted ? muteIcon : unmuteIcon} width={24} height={24} alt="" quality={100} />
//         </button>
//       )}
//     </section>
//   );
// };

// export default FlixReelContent;
