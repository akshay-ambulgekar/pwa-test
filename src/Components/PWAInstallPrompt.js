
// 'use client';
// import { useCallback, useEffect, useRef, useState } from "react";
// import Image from "next/image";

// // import LoadingAnimation from "../app/auth/LoadingAnimation";


// //icons
// import SaveOnYourPhone from '@/Images/Icons/save-on-your-phone-icon.png';

// import PropTypes from 'prop-types';

// function PwaModal() {
//     // let [loadingAnimation, setLoadingAnimation] = useState(false);
//     const [showPWAModal, setShowPWAModal] = useState(false);

//     let modalRef = useRef();

//     useEffect(() => {

//         function handleOutsideClick(e) {
//             if (modalRef.current && !modalRef.current.contains(e.target)) {
//                 setShowPWAModal(false);
//             }
//         }
//         document.addEventListener('click', handleOutsideClick);

//         return () => {
//             document.removeEventListener('click', handleOutsideClick);
//         };
//     }, []);

//     let closeModal = useCallback(() => {
//         setShowPWAModal(false);
//     }, [showPWAModal]);


//     const [deferredPrompt, setDeferredPrompt] = useState(null);
//     // const [showPrompt, setShowPrompt] = useState(false);

//     // Listen for the 'beforeinstallprompt' event
//     useEffect(() => {
//         const handleBeforeInstallPrompt = (e) => {
//             e.preventDefault(); // Prevent the default mini-infobar
//             setDeferredPrompt(e); // Save the event for later use
//         };

//         window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

//         return () => {
//             window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
//         };
//     }, []);

//     useEffect(() => {
//         if (deferredPrompt) {
//             // Show the prompt after 2 seconds
//             const timer = setTimeout(() => {
//                 setShowPWAModal(true);
//             }, 1000);

//             return () => clearTimeout(timer); // Cleanup timer
//         }

//         return undefined;

//     }, [deferredPrompt]);

//     // Detect user scroll on the scrollable container
//     useEffect(() => {
//         const scrollContainer = document.querySelector('.scroll-container-pwa-prompt'); // Adjust the class name if needed

//         const handleUserScroll = () => {
//             if (deferredPrompt) {
//                 setShowPWAModal(true);
//                 if (scrollContainer) {
//                     scrollContainer.removeEventListener('scroll', handleUserScroll);
//                 }
//             }
//         };

//         if (scrollContainer) {
//             scrollContainer.addEventListener('scroll', handleUserScroll);
//         }

//         return () => {
//             if (scrollContainer) {
//                 scrollContainer.removeEventListener('scroll', handleUserScroll);
//             }
//         };
//     }, [deferredPrompt]);

//     // Trigger prompt on click
//     useEffect(() => {
//         const handleUserClick = () => {
//             if (deferredPrompt) {
//                 setShowPWAModal(true);
//                 window.removeEventListener('click', handleUserClick);
//             }
//         };

//         window.addEventListener('click', handleUserClick);

//         return () => {
//             window.removeEventListener('click', handleUserClick);
//         };
//     }, [deferredPrompt]);

//     const handleInstallClick = useCallback(
//         async () => {
//             if (deferredPrompt) {
//                 try {
//                     deferredPrompt.prompt(); // Show the browser's install dialog
//                     const choiceResult = await deferredPrompt.userChoice;

//                     if (choiceResult.outcome === 'accepted') {
//                         // console.log('PWA installed');
//                     } else {
//                         // console.log('PWA installation declined');
//                     }
//                     // Reset the prompt and custom UI state after handling
//                     setDeferredPrompt(null); // Clear the prompt
//                     setShowPWAModal(false); // Hide the custom UI
//                 } catch (error) {
//                     console.error('Error during PWA installation:', error);
//                 }
//             }
//         },
//         [deferredPrompt]
//     );

//     if (!showPWAModal) {
//         return null; // Don't render anything if showPrompt is false
//     }

//     return (
//         <div className="  ">
//             <div className={`page-center-parent-container !min-h-[auto] w-full flex flex-col gap-8 px-6  background-custom-grey50 duration-500 small-border border-black fixed left-[50%] -translate-x-[50%] z-[5] ${showPWAModal ? ' bottom-0 pb-10 pt-2  ' : '  -bottom-[100%]  overflow-hidden '} `} ref={modalRef} >
//                 <div className="flex justify-center items-center">
//                     <div className="w-12  background-custom-grey400 cursor-pointer  h-[2px]" onClick={closeModal}></div>
//                 </div>

//                 {/* absolute bottom-0 */}
//                 <section className="gap-8 pt-2 px-6 pb-7 background-custom-grey50  flex flex-col items-center">
//                     {/* seperator */}
//                     {/* <div className="background-custom-grey400 h-[2px] w-12 "></div> */}
//                     {/* save on your phone */}
//                     <section className=" gap-3 flex flex-col justify-center items-center text-center">
//                         <Image src={SaveOnYourPhone} width={100} height={100} alt="img" quality={100} />
//                         <h2 className="heading-h2 custom-text-grey900 mt-3">Save on your Phone</h2>
//                         <p className=" font-normal body custom-text-grey700">Tap the button below to install our app and stay connected wherever you go!</p>
//                     </section>
//                     {/* install now button */}
//                     <button onClick={handleInstallClick} className="background-custom-grey900 py-4 px-7 rounded-[2px] uppercase all-caps-12-bold custom-text-white w-full">Install NOW</button>
//                 </section>

//             </div>
//         </div>
//     );
// }


// export default PwaModal;

// PwaModal.propTypes = {
//     showPWAModal: PropTypes.bool,
//     setShowPWAModal: PropTypes.func,
// };


'use client';
import React, { useCallback } from "react";
import { useState, useEffect } from 'react';
import Image from "next/image";


//images
import SaveOnYourPhone from '@/Images/Icons/save-on-your-phone-icon.png';


const PWAInstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);

    // Listen for the 'beforeinstallprompt' event
    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault(); // Prevent the default mini-infobar
            setDeferredPrompt(e); // Save the event for later use
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    useEffect(() => {
        if (deferredPrompt) {
            // Show the prompt after 2 seconds
            const timer = setTimeout(() => {
                setShowPrompt(true);
            }, 1000);

            return () => clearTimeout(timer); // Cleanup timer
        }

        return undefined;

    }, [deferredPrompt]);

    // Detect user scroll on the scrollable container
    useEffect(() => {
        const scrollContainer = document.querySelector('.scroll-container-pwa-prompt'); // Adjust the class name if needed

        const handleUserScroll = () => {
            if (deferredPrompt) {
                setShowPrompt(true);
                if (scrollContainer) {
                    scrollContainer.removeEventListener('scroll', handleUserScroll);
                }
            }
        };

        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleUserScroll);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleUserScroll);
            }
        };
    }, [deferredPrompt]);

    // Trigger prompt on click
    useEffect(() => {
        const handleUserClick = () => {
            if (deferredPrompt) {
                setShowPrompt(true);
                window.removeEventListener('click', handleUserClick);
            }
        };

        window.addEventListener('click', handleUserClick);

        return () => {
            window.removeEventListener('click', handleUserClick);
        };
    }, [deferredPrompt]);

    const handleInstallClick = useCallback(
        async () => {
            if (deferredPrompt) {
                try {
                    deferredPrompt.prompt(); // Show the browser's install dialog
                    const choiceResult = await deferredPrompt.userChoice;

                    if (choiceResult.outcome === 'accepted') {
                        // console.log('PWA installed');
                    } else {
                        // console.log('PWA installation declined');
                    }
                    // Reset the prompt and custom UI state after handling
                    setDeferredPrompt(null); // Clear the prompt
                    setShowPrompt(false); // Hide the custom UI
                } catch (error) {
                    console.error('Error during PWA installation:', error);
                }
            }
        },
        [deferredPrompt]
    );

    if (!showPrompt) {
        return null; // Don't render anything if showPrompt is false
    }


    return (
        <>
            {/* <div className={`page-center-parent-container !min-h-[auto]   w-full  flex flex-col gap-8 px-6  background-custom-grey50   duration-500 small-border border-black fixed left-[50%] -translate-x-[50%] z-[2] ${showCouponModal ? ' bottom-0 pb-10 pt-2  ' : '  -bottom-[100%]  overflow-hidden '} `} ref={modalRef} ></div> */}
            {/* <article className="w-full h-full z-10  ">

                <div className="relative page-center-parent-container h-[100dvh]  bg-black bg-opacity-80  duration-500 small-border-x border-black">
                    <section className=" absolute bottom-0 gap-8 pt-2 px-6 pb-7 background-custom-grey50 flex flex-col items-center">
                      
                        <div className="background-custom-grey400 h-[2px] w-12 "></div>

                       
                        <section className=" gap-3 flex flex-col justify-center items-center text-center">
                            <Image src={SaveOnYourPhone} width={100} height={100} alt="img" quality={100} />
                            <h2 className="heading-h2 custom-text-grey900 mt-3">Save on your Phone</h2>
                            <p className=" font-normal body custom-text-grey700">Tap the button below to install our app and stay connected wherever you go!</p>
                        </section>
                       
                        <button onClick={handleInstallClick} className="background-custom-grey900 py-4 px-7 rounded-[2px] uppercase all-caps-12-bold custom-text-white w-full">Install NOW</button>
                    </section>
                </div>

            </article> */}

            <div className=" ">
            <div className={`page-center-parent-container !min-h-[auto] w-full flex flex-col gap-8 px-6  background-custom-grey50 duration-500 small-border border-black fixed left-[50%] -translate-x-[50%] z-[5] ${showPrompt ? ' bottom-0 pb-10 pt-2  ' : '  -bottom-[100%]  overflow-hidden '} `} >
                 <div className="flex justify-center items-center">
                     <div className="w-12  background-custom-grey400 cursor-pointer  h-[2px]" ></div>
                 </div>

                 {/* absolute bottom-0 */}
                <section className="gap-8 pt-2 px-6 pb-7 background-custom-grey50  flex flex-col items-center">
                     {/* seperator */}
                     {/* <div className="background-custom-grey400 h-[2px] w-12 "></div> */}
                     {/* save on your phone */}
                     <section className=" gap-3 flex flex-col justify-center items-center text-center">
                         <Image src={SaveOnYourPhone} width={100} height={100} alt="img" quality={100} />
                         <h2 className="heading-h2 custom-text-grey900 mt-3">Save on your Phone</h2>
                         <p className=" font-normal body custom-text-grey700">Tap the button below to install our app and stay connected wherever you go!</p>
                     </section>
                     {/* install now button */}
                     <button onClick={handleInstallClick} className="background-custom-grey900 py-4 px-7 rounded-[2px] uppercase all-caps-12-bold custom-text-white w-full">Install NOW</button>
                 </section>

             </div>
         </div>

            
        </>
    );
};

export default PWAInstallPrompt;



//original code
// 'use client';
// import React, { useCallback } from "react";
// import { useState, useEffect } from 'react';
// import Image from "next/image";


// //images
// import SaveOnYourPhone from '@/Images/Icons/save-on-your-phone-icon.png';


// const PWAInstallPrompt = () => {
//     const [deferredPrompt, setDeferredPrompt] = useState(null);
//     const [showPrompt, setShowPrompt] = useState(false);

//     // Listen for the 'beforeinstallprompt' event
//     useEffect(() => {
//         const handleBeforeInstallPrompt = (e) => {
//             e.preventDefault(); // Prevent the default mini-infobar
//             setDeferredPrompt(e); // Save the event for later use
//         };

//         window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

//         return () => {
//             window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
//         };
//     }, []);

//     useEffect(() => {
//         if (deferredPrompt) {
//             // Show the prompt after 2 seconds
//             const timer = setTimeout(() => {
//                 setShowPrompt(true);
//             }, 2000);

//             return () => clearTimeout(timer); // Cleanup timer
//         }

//         return undefined;

//     }, [deferredPrompt]);

//     // Detect user scroll on the scrollable container
//     useEffect(() => {
//         const scrollContainer = document.querySelector('.scroll-container-pwa-prompt'); // Adjust the class name if needed

//         const handleUserScroll = () => {
//             if (deferredPrompt) {
//                 setShowPrompt(true);
//                 if (scrollContainer) {
//                     scrollContainer.removeEventListener('scroll', handleUserScroll);
//                 }
//             }
//         };

//         if (scrollContainer) {
//             scrollContainer.addEventListener('scroll', handleUserScroll);
//         }

//         return () => {
//             if (scrollContainer) {
//                 scrollContainer.removeEventListener('scroll', handleUserScroll);
//             }
//         };
//     }, [deferredPrompt]);

//     // Trigger prompt on click
//     useEffect(() => {
//         const handleUserClick = () => {
//             if (deferredPrompt) {
//                 setShowPrompt(true);
//                 window.removeEventListener('click', handleUserClick);
//             }
//         };

//         window.addEventListener('click', handleUserClick);

//         return () => {
//             window.removeEventListener('click', handleUserClick);
//         };
//     }, [deferredPrompt]);

//     const handleInstallClick = useCallback(
//         async () => {
//             if (deferredPrompt) {
//                 try {
//                     deferredPrompt.prompt(); // Show the browser's install dialog
//                     const choiceResult = await deferredPrompt.userChoice;

//                     if (choiceResult.outcome === 'accepted') {
//                         // console.log('PWA installed');
//                     } else {
//                         // console.log('PWA installation declined');
//                     }
//                     // Reset the prompt and custom UI state after handling
//                     setDeferredPrompt(null); // Clear the prompt
//                     setShowPrompt(false); // Hide the custom UI
//                 } catch (error) {
//                     console.error('Error during PWA installation:', error);
//                 }
//             }
//         },
//         [deferredPrompt]
//     );

//     if (!showPrompt) {
//         return null; // Don't render anything if showPrompt is false
//     }

//     return (
//         <>
//             <article className="page-center-parent-container fixed bg-black bg-opacity-80 ">
//                 <section className={""}>
//                     <div className=" gap-8 pt-2 px-6 pb-7 bg-[#FDFBF8] w-full flex flex-col items-center">
//                         {/* seperator */}
//                         <div className="background-custom-grey400 h-[2px] w-12 "></div>
//                         {/* save on your phone */}
//                         <section className=" gap-3 flex flex-col justify-center items-center text-center">
//                             <Image src={SaveOnYourPhone} width={100} height={100} alt="img" quality={100} />
//                             <h2 className="heading-h2 custom-text-grey900 mt-3">Save on your Phone</h2>
//                             <p className=" font-normal body custom-text-grey700">Tap the button below to install our app and stay connected wherever you go!</p>
//                         </section>
//                         {/* install now button */}
//                         <button onClick={handleInstallClick} className="background-custom-grey900 py-4 px-7 rounded-[2px] uppercase all-caps-12-bold custom-text-white w-full">Install NOW</button>
//                     </div>
//                 </section>
//             </article>
//         </>
//     );
// };

// export default PWAInstallPrompt;


