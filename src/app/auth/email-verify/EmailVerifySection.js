'use client';
export const dynamic = 'force-dynamic'; // Ensure this page is rendered dynamically
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import LoadingAnimation from "../LoadingAnimation";

 

function EmailVerifySection() {
    let searchParams=useSearchParams();
    let accessToken=searchParams?.get('url');
    let[sessionExpired,setSessionExpired]=useState(false);
    let router=useRouter();
    let baseurl=process.env.BACKEND_ENDPOINT;
    
    useEffect(()=>{
        fetch(`${baseurl}auth/confirm/${accessToken}`)
        .then((data)=>{
            return data.json();
        })
        .then((response)=>{
            if(response&&'status' in response&&'message' in response)
            {
                if(response.message==='Maill Verified Successfully!')
                {
                    router.push('/auth/email-verified');
                }
                if(response.message==="Invalid or expired token.")
                {
                    setSessionExpired(true);
                }
            }
        })
        .catch((error)=>{
            console.error(error);
        });
    },[accessToken]);

    let goBackToSignUp=useCallback(()=>
    {
        router.push('/');
    },[]);
    return(
        <>
            <section className={"flex justify-center h-screen w-full background-custom-grey100   " }>
                <div className="page-center-parent-container  h-full  overflow-scrollbar-hidden small-border-x custom-border-grey800 overflow-scroll flex flex-col items-center justify-center gap-7" >
                    <LoadingAnimation/>
                   {sessionExpired? <h2 className="heading-h2 custom-text-grey900 text-center">This link has expired : Please request a new one.</h2>
                    :<h2 className="heading-h2 custom-text-grey900 text-center">Verifying your email..</h2>}
                </div>
              {sessionExpired&& <button className={`py-4 px-7 w-full flex justify-center items-center shadow-sm custom-text-white all-caps-12 text-center   bg-black `} onClick={goBackToSignUp}>Try Again</button>}

            </section>
        </>
    );
}
export default EmailVerifySection;
