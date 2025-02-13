'use client';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

//components
import IntialLoadingAnimation from '@/Components/InitialPageLoadingAnimation';
import MyOrderComponent from '@/Components/MyOrderComponent';

//images
import CloseIcon from '@/Images/Icons/close-icon-new.svg';

//API
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import GetOrdersApi from '@/apis/store/GetOrdersApi';


function MyOrdersSection() {

    let [accessToken, setAccessToken] = useState('');
    let [gettingAccessToken, setGettingAccessToken] = useState(true);

    let [orderInfo, setOrderInfo] = useState('');

    let router = useRouter();
    //to get a access token
    useEffect(() => {
        getAccessToken();
    }, []);

    useEffect(() => {
        if (accessToken) {
            getOrderInfo();
        }
    }, [accessToken]);


    //getting access token
    function getAccessToken() {
        GetAccessTokenAPI()
            .then((response) => {
                if (response && 'message' in response && response.message === 'Refresh token is missing!') {
                    window.location.href = '/auth/user-auth';
                }
                if (response && 'access_token' in response) {
                    setAccessToken(response.access_token);
                }

            })
            .catch(() => {

            })
            .finally(() => {
                setGettingAccessToken(false);
            });

    }

    //get cart information from api
    function getOrderInfo() {
        GetOrdersApi(accessToken)
            .then((response) => {
                if (response && 'response' in response) {
                    if ('orders' in response.response) {
                        setOrderInfo(response?.response?.orders);
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }


    let handleBackBtn=useCallback(()=>{
        router.push('/my-account');
    },[]);

    function getFormattedDateTime(dateStr) {
        const date = new Date(dateStr);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Extract date components
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        // Extract time components
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convert to 12-hour format

        // Create an object with both date and time
        return {
            formattedDate: `${month} ${day}, ${year}`,
            formattedTime: `${hours}:${minutes} ${period}`,
        };
    }
    return (
        <>
            {gettingAccessToken || !accessToken ? <IntialLoadingAnimation />
                : <div className={"flex justify-center  w-full background-custom-grey50   "}>
                    <div className="page-center-parent-container  custom-border-grey600  overflow-scrollbar-hidden  ">
                        <div className="">
                            <div className=" small-border border-black h-full min-h-screen ">
                                <button className="py-3 px-4" onClick={handleBackBtn}>
                                    <Image src={CloseIcon} width={24} height={24} alt='img' quality={100} className='' />
                                </button>
                                <h4 className="heading-h4 custom-text-grey900 small-border-bottom border-black pt-6 pb-5 px-6">My Orders</h4>
                                <section className="">
                                    {orderInfo?.length > 0 ? orderInfo?.map((element, index) => {
                                        let { formattedDate, formattedTime } = getFormattedDateTime(element?.created_at);
                                        return <MyOrderComponent key={index} orderId={element?.id} displayId={element?.display_id} price={element?.total} quantity={element?.items?.length} date={formattedDate} time={formattedTime} status={element?.fulfillment_status} />;
                                    })
                                        :
                                        <div className="all-caps-10 custom-text-grey800 px-6 py-5 ">No orders found</div>
                                    }


                                </section>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    );
}

export default MyOrdersSection;

