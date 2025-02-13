'use client';
import React, { useEffect, useState } from "react";
import '@/Styles/policies/policies.css';

//components
import PageCloseButton from "@/Components/PageCloseButton";

//API
import PoliciesApi from "@/apis/PoliciesApi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";


const TermsOfUseSection = () => {

  let [richText, setRichText] = useState([]);


  function fetchData() {

    PoliciesApi('Terms of use')
      .then((response) => {
        setRichText(response.policy_text);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <article className={"overflow-scroll scroll-smooth page-center-parent-container h-[100dvh] border-r-[0.5px] border-l-[0.5px] custom-border-grey950 "} >
        
        {/* page close button */}
        <PageCloseButton href="/my-account/legal-policies-and-more" />
        
        <main className="gap-8 mx-6 mt-5 mb-16 flex flex-col scroll-smooth">

          <h1 className=" heading-h1 custom-text-grey900 capitalize ">Terms of Use</h1>

          {/* rich text */}
          <section className={"policies " }>
            <BlocksRenderer content={richText} />
          </section>
        </main>

      </article>
    </>
  );
};

export default TermsOfUseSection;
