"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

//components
import FlixShareButton from "./FlixShareButton";

//icons
import ArrowLeft from '@/Images/Icons/arrow-left.svg';
import BookmarkLight from "@/Images/Icons/bookmark-light.svg";
import LikeLight from "@/Images/Icons/like-light.svg";

// active light icons for dark footer
import ActiveBookmarkLight from '@/Images/Icons/bookmark-active-light.svg';
import ActiveLikeLight from '@/Images/Icons/like-active-light.svg';

//logo
import HotAndCoolLogo from '@/Images/Icons/hot-and-cool-logo.png';
import showFlixReelToaster, { FlixReelToaster } from "./FlixReelToaster";

//API
import GetAccessTokenAPI from "@/apis/auth/GetAccessToken";

import PropTypes from 'prop-types';


const FlixReelFooter = ({ positionValue, isLogo = false, title, url }) => {

  const [isBookmarkActive, setIsBookmarkActive] = useState(false);
  const [isLikeActive, setIsLikeActive] = useState(false);

  const router = useRouter();

  let [accessToken, setAccessToken] = useState(); // let[gettingAccessToken,setGettingAccessToken]=useState(true);

  useEffect(() => {
    getAccessToken();
  }, []);

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


  // SAVE blog api call

  const saveFlixBlog = useCallback(
    () => {
      if (!accessToken) {
        router.push('/auth/user-auth');
        return; // Prevent further execution if not authenticated
      }
      setIsBookmarkActive(!isBookmarkActive);
      const toastMessage = isBookmarkActive ? "Removed from Saved" : "Added to Saved Flix";
      showFlixReelToaster(toastMessage, isBookmarkActive);
    },
    [accessToken, router]
  );


  // LIKE blog api call
  const likeFlixBlog = useCallback(
    () => {
      if (!accessToken) {
        router.push('/auth/user-auth');
        return; // Prevent further execution if not authenticated
      }
      setIsLikeActive(!isLikeActive);
      const toastMessage = isLikeActive ? "Unliked" : "Liked";
      showFlixReelToaster(toastMessage, isLikeActive);
    }, [accessToken,router]
  );

  const handleBack = useCallback(
    async () => {
      router.push("/");
    }, [router]
  );

  return (

    <footer className={`${positionValue} bottom-0 pb-10 w-full `}>

      {/* Save / Like MODAL */}
      <FlixReelToaster />

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

          <FlixShareButton title={title} url={url} />

        </section>

        {/* hot and cool Logo */}
        {isLogo && <Image src={HotAndCoolLogo} width={53} height={40} alt="hot&cool" quality={100} className="absolute z-10 left-1/2 transform translate-x-1/2 ml-16" />}

      </div>

    </footer>
  );
};

export default FlixReelFooter;

FlixReelFooter.propTypes = {
  positionValue: PropTypes.string,
  isLogo: PropTypes.bool,
  title: PropTypes.any,
  url: PropTypes.any,
};
