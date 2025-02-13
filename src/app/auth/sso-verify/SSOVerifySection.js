'use client';
import {  useSearchParams } from "next/navigation";
import { useEffect } from "react";
import LoadingAnimation from "../LoadingAnimation";

export const dynamic = 'force-dynamic'; // Ensure this page is rendered dynamically



function SSOVerifySection() {
    let searchParams=useSearchParams();
    let accessToken=searchParams.get('url');
    let refferalCode=sessionStorage.getItem('ref');
    let obj={
        'referral_code':refferalCode
    };
    useEffect(()=>{
        let baseUrl=process.env.BACKEND_ENDPOINT;
        fetch(`${baseUrl}auth/generate-new-access-token`,{
            method:'POST',
            headers:{
                'Authorization':'Bearer '+accessToken,
                'Content-Type':'application/json',
            },
            credentials:'include',
            body:JSON.stringify(obj)
        })
        .then((data)=>{
            return data.json();
        })
        .then((response)=>{
            // console.log('response :',response);
            if(response&&'message' in response&&response.message==='New access token generated successfully.')
            {
                if(sessionStorage.getItem('ref'))
                    {
                        sessionStorage.removeItem('ref');
                    }
                
                if(response&&'mobile_verified' in response&&!response.mobile_verified)
                {
                    window.location.href='/auth/mobile-verification';
                }
                else if(response&&'userdetails' in response&&!response.userdetails)
                {
                    window.location.href='/auth/user-information';
                }
                // "userdetails": false

                else{
                    window.location.href='/';
                    
                }
            }
        })
        .catch((error)=>{
            console.error(error);
        });
    },[accessToken]);
    return(
        <>
            <section className={"flex justify-center h-screen w-full background-custom-grey100   " }>
                <div className="page-center-parent-container  h-full  overflow-scrollbar-hidden small-border-x custom-border-grey800 overflow-scroll flex flex-col items-center justify-center gap-7" >
                    <LoadingAnimation/>
                    <h2 className="heading-h2 custom-text-grey900 text-center">Verifying your email..</h2>
                </div>
               {/* <button className={`py-4 px-7 w-full flex justify-center items-center shadow-sm custom-text-white all-caps-12 text-center   bg-black `}><LoadingAnimation borderColor='border-white'/></button> */}

            </section>
        </>
    );
}
export default SSOVerifySection;
