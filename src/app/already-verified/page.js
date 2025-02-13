'use client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

function Page()
{
    let router=useRouter();
    
    let handleSignInBtn=useCallback(()=>
    {
        router.push('/sign-in');
    },[]);
    return(
        <>
        <section className={"flex justify-center h-screen w-full background-custom-grey100  overflow-hidden "}>
            
            <div className="page-center-parent-container small-border custom-border-grey600 background-custom-white">
                
                <div className="flex flex-col px-6 pt-2 pb-10 background-custom-grey100 gap-8 h-screen ">
                    
                        <h1 className="heading-h1">You Already have an account go for sign in</h1>
                        <button className="py-2 px-4 bg-black custom-text-white body-bold" onClick={handleSignInBtn}>Sign In</button>

                </div>
            </div>
        </section>
        </>
    );
}

export default Page;