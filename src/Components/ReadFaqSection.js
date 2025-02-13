import React from "react";
import Link from "next/link";


const ReadFaqSection = () => {
  return (
    <section className={" gap-3 my-10 flex flex-col justify-center items-center "  } >
      
      <p className="body-sm font-normal custom-text-grey900 "> Have any doubts?</p>

      <Link href="/my-account/help" className="background-custom-grey50 border-[0.5px] custom-border-grey800 all-caps-10-bold custom-text-grey900 py-3 px-6 ">
        Read FAQS
      </Link>
      
    </section>
  );
};

export default ReadFaqSection;
