'use client';

import Image from 'next/image';

//section images
import CloseIcon from '@/Images/Store/close-icon.svg';

//bottom checkout images
import { useCallback, useEffect, useState } from 'react';

import GetCartInfoApi from '@/apis/store/GetCartInfoApi';
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import { useRouter } from 'next/navigation';
import GetSingleOrderInfoApi from '@/apis/store/GetSingleOrderInfoApi';
import IntialLoadingAnimation from '@/Components/InitialPageLoadingAnimation';

import PropTypes from 'prop-types';

function SingleOrderListSection({ orderId }) {

    let [accessToken, setAccessToken] = useState('');
    let [gettingAccessToken, setGettingAccessToken] = useState(true);


    let [orderInfo, setOrderInfo] = useState([]);
    let [cartInfo, setCartInfo] = useState();
    let [dateTime, setDateTime] = useState('');


    let router = useRouter();

    //to get a access token
    useEffect(() => {
        getAccessToken();
    }, []);

    useEffect(() => {
        if (accessToken) {
            getOrderInfo();
            getCartInfo();
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
            .finally();
        {
            setGettingAccessToken(false);
        }
    }

    //get cart information from api
    function getCartInfo() {
        GetCartInfoApi(accessToken)
            .then((response) => {

                if (response && 'cart_id' in response) {
                    setCartInfo(response);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }


    function getOrderInfo() {
        setGettingAccessToken(true);
        GetSingleOrderInfoApi(orderId, accessToken)
            .then((response) => {
                if (response && 'response' in response) {
                    if ('order' in response.response) {
                        setOrderInfo(response?.response?.order);
                        let datetime = getFormattedDateTime(response?.response?.order?.billing_address?.created_at);
                        setDateTime(datetime);
                    }
                }
            })
            .catch(() => {

            })
            .finally(() => {
                setGettingAccessToken(false);
            });
    }



    let handleBackClick=useCallback(()=>{
        router.push('/my-account/orders');
    },[]);

    //utility function 
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

    let statusBackgroundColor = {
        'processing': 'background-custom-grey100',
        'shipped': 'background-custom-grey800',
        'delivered': 'bg-[#01C572]',
        'not_fulfilled': 'bg-[#01C572]',
    };

    let statusColor = {
        'processing': 'custom-text-grey900',
        'shipped': 'custom-text-white',
        'delivered': 'custom-text-white',
        'not_fulfilled': 'custom-text-white',
    };

    let statusBorderColor = {
        'processing': 'custom-border-grey300',
        'not_fulfilled': 'custom-border-grey300',
        'shipped': '',
        'delivered': '',
    };
    return (
        <>
            {gettingAccessToken || !accessToken ? <IntialLoadingAnimation /> :

                    <div className="page-center-parent-container background-custom-grey50  overflow-scrollbar-hidden ">
                        <div className=" small-border-x border-black ">


                            {/* navbar  */}
                            <div className="relative flex items-center justify-center py-3.5 px-4 background-custom-grey50">
                                <button onClick={handleBackClick} className='absolute top-4 left-3.5'>
                                    <Image src={CloseIcon} width={20} height={20} alt="img" quality={100} className="" />
                                </button>
                                <h4 className="heading-h4 custom-text-grey900">Order Details</h4>
                            </div>


                            {/* Order details */}
                            <div className="background-custom-grey50 py-7 px-6 flex flex-col gap-3  small-border-top custom-border-grey800">
                                <div className="all-caps-12-bold custom-text-grey900">Order ID: {orderInfo?.display_id}</div>
                                <div className="flex gap-2 ">
                                    <div className="all-caps-10 custom-text-grey600">Order date:</div>
                                    <div className="custom-text-grey600 all-caps-10">{dateTime?.formattedDate}</div>
                                    <div className="w-[0.5px] h-3.5 background-custom-grey500"></div>
                                    <div className="custom-text-grey600 all-caps-10">{dateTime?.formattedTime}</div>
                                </div>
                            </div>







                            {/* Delivery details */}
                            <div className=" py-7 px-6 flex gap-2 justify-between items-start small-border-y custom-border-grey800">
                                <div className="flex justify-between items-center gap-2 w-full ">
                                    <div className="all-caps-12-bold custom-text-grey900">Order Status</div>
                                    <div className={`${statusBackgroundColor[status]} all-caps-10-bold ${statusColor[status]} small-border ${statusBorderColor[status]} py-1 px-2 `}>{orderInfo?.fulfillment_status}</div>

                                </div>
                            </div>

                            {orderInfo?.items?.length > 0 && orderInfo?.items?.map((element, index) => {
                                return <div key={index} className="grid grid-cols-[119px,auto] small-border-bottom custom-border-grey800 ">
                                    <Image src={element?.thumbnail} width={195} height={292} alt="img" quality={100} className=" w-full h-full object-cover small-border-right custom-border-grey800" />

                                    <div className="flex flex-col justify-between p-4 pr-3 gap-10">

                                        <div className="flex flex-col gap-4">

                                            <div className="all-caps-10 custom-text-grey600">by {element?.product_collection || ""}</div>

                                            <div className="all-caps-10-bold custom-text-grey900">{element?.product_title || ""}</div>
                                            <div className="all-caps-10-bold custom-text-grey900">QTY {element?.quantity || ''}</div>
                                        </div>

                                        {/* <div className="flex items-center gap-1">
                         <Image src={Minus} width={20} height={20} alt="img" quality={100} className="cursor-pointer" onClick={()=>{handleSubstractCount(element?.id,element?.quantity)}}/>
                         <div className="all-caps-12-bold custom-text-grey900">{element?.quantity}</div>
                         <Image src={Plus} width={20} height={20} alt="img" quality={100} className="cursor-pointer" onClick={()=>{handleAddCount(element?.id,element?.quantity)}}/>
                     </div> */}
                                        <div className="all-caps-12-bold custom-text-grey800 ">₹{element?.unit_price || ''}</div>

                                    </div>
                                </div>;
                            })

                            }


                            {/* delivery address details  */}
                            <div className=" py-7 px-6 flex flex-col gap-3 justify-between items-start  custom-border-grey800">
                                <div className="all-caps-12-bold custom-text-grey900">Delivering to</div>
                                <div className="flex flex-col gap-1">
                                    <div className="body-sm custom-text-grey900">{cartInfo?.details_data?.first_name || ""} {cartInfo?.details_data?.last_name || ""}</div>
                                    <div className="flex items-center gap-2">
                                        <div className="custom-text-grey600 body-sm">{cartInfo?.details_data?.phone_number}</div>
                                        <div className="w-[0.5px] h-4 background-custom-grey500"></div>
                                        <div className="custom-text-grey600 body-sm">{cartInfo?.email}</div>
                                    </div>
                                    <div className="custom-text-grey600 body-sm">{orderInfo?.billing_address?.address_1}
                                        <br />
                                        {orderInfo?.billing_address?.city} {orderInfo?.billing_address?.province} {orderInfo?.billing_address?.postal_code}
                                    </div>
                                </div>
                            </div>



                            <div className="px-6 py-8  small-border-y border-black">


                                <div className="flex flex-col gap-4 ">
                                    <button className="py-[5px] px-2 flex items-center gap-1 ">
                                        <div className="all-caps-12-bold custom-text-grey900">Order Summary</div>
                                    </button>
                                    <div className="">
                                        <div className="custom-text-grey900 small-border custom-border-grey800 border-dashed  "></div>
                                    </div>
                                    <div className="flex flex-col gap-2 py-4 ">
                                        <div className="flex justify-between">
                                            <div className="all-caps-12 custom-text-grey900">Subtotal:</div>
                                            <div className="all-caps-12-bold custom-text-grey800">₹{orderInfo?.total}</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="all-caps-12 custom-text-grey900">Shipping:</div>
                                            <div className="all-caps-12-bold custom-text-grey600">FREE</div>
                                        </div>
                                    </div>


                                    <div className="">
                                        <div className="custom-text-grey900 small-border custom-border-grey800 border-dashed  "></div>
                                    </div>

                                    <div className="flex justify-between  ">
                                        <div className="all-caps-14-bold custom-text-grey900">Total</div>
                                        <div className="flex flex-col items-end gap-1.5">
                                            <div className="flex items-center ">
                                                <div className="all-caps-14-bold custom-text-grey800">₹{orderInfo?.total}</div>
                                            </div>
                                            <div className="body custom-text-grey600">incl. of all taxes</div>
                                        </div>
                                    </div>

                                </div>


                            </div>
                            <div className="flex flex-col items-center gap-10 py-10 px-6 ">
                                <button className='w-full border-[0.5px] custom-border-grey800 py-3 px-6 all-caps-10-bold custom-text-grey900  ' type='button'>Cancel Order</button>

                                <div className="flex justify-center">
                                    <div className="flex flex-col gap-3 items-center">
                                        <div className="body-sm custom-text-grey900">Have any doubts?</div>
                                        <button className='w-32 border-[0.5px] custom-border-grey800 py-3 px-6 all-caps-10-bold custom-text-grey900   ' type='button'>Read FAQS</button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
            }
        </>
    );
}

export default SingleOrderListSection;

SingleOrderListSection.propTypes={
    orderId:PropTypes.any
};