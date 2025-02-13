'use client';

import Image from 'next/image';

//section images
import CloseIcon from '@/Images/Store/close-icon.svg';
import UserIcon from '@/Images/Checkout/user-circle.svg';
import Location from '@/Images/Checkout/location.svg';
import EditIcon from '@/Images/Checkout/edit-icon.svg';
import Offer from '@/Images/Checkout/Offer.svg';
import Arrow from '@/Images/Checkout/chevron-icon.svg';
import Availability from '@/Images/Checkout/Availability.svg';

//order details
import Subtract from '@/Images/Checkout/Subtract.svg';

//coupon codes
import CheckLine from '@/Images/Icons/check-line.svg';
import CouponCross from '@/Images/Icons/coupon-cross.svg';



//bottom checkout images
import Store from '@/Images/Homepage/store-icon.svg';
import RazorpayIcon from '@/Images/Store/razorpay-logo.svg';
import CheckIcon from '@/Images/Store/check-icon.svg';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import ManageAddress from '../../../Components/ManageAddressModal';

import GetCartInfoApi from '@/apis/store/GetCartInfoApi';
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import GetCartItemsApi from '@/apis/store/GetCartItemsApi';
import { useRouter } from 'next/navigation';
import GetAddressApi from '../../../apis/store/GetAddressApi';
import CreatePaymentCollectionApi from '@/apis/store/CreatePaymentCollectionApi';
import GetPaymentProviderList from '@/apis/store/GetPaymentProviderList';
import IntiatePaymentApi from '@/apis/store/IntiatePaymentApi';
import AddShippingMethodsApi from '@/apis/store/AddShippingMethodsApi';

import { useRazorpay } from "react-razorpay";
import TaxesApi from '@/apis/store/TaxesApi';
import CreateCartApi from '@/apis/store/CreateCartApi';
import GenerateOrderApi from '@/apis/store/GenerateOrderApi';
import DeleteCartIdApi from '@/apis/store/DeleteCartIdApi';
import CouponModal from '@/Components/CouponModal';
import RemoveCouponCodeApi from '@/apis/store/RemoveCouponCodeApi';
import DashedBorder from '@/Components/DashedBorder';
import IntialLoadingAnimation from '@/Components/InitialPageLoadingAnimation';


function CheckoutSection() {

    let [showModal, setShowModal] = useState(false);
    let [accessToken, setAccessToken] = useState('');
    let [gettingAccessToken, setGettingAccessToken] = useState(true);

    let [cartInfo, setCartInfo] = useState('');



    let [cartItems, setCartItems] = useState([]);
    // let[notEligibleForCheckout,setNotEligibleForCheckout]=useState(true);
    let [selectedTerms, setSelectedTerms] = useState('');
    let [userAddress, setUserAddress] = useState('');

    // let [shippingId, setShippingId] = useState('');
    let [paymentCollection, setPaymentCollection] = useState(null);
    // let [paymentProviderList, setPaymentProvidersList] = useState([]);
    let [invalidAddress, setInvalidAddress] = useState(false);

    let [tax, setTax] = useState('');
    let [orderDetails, setOrderDetails] = useState('');

    let [showCouponModal, setShowCouponModal] = useState(false);


    let router = useRouter();

    const {  Razorpay } = useRazorpay();
    //to get a access token
    useEffect(() => {
        getAccessToken();
        getPaymentProviderList();
    }, []);
   

    useEffect(() => {
        if (accessToken) {
            getCartInfo();
        }
    }, [accessToken]);

    useEffect(() => {
        if (cartInfo) {
            getCartItems();
            getAddress();
            AddShippingMethod();
        }
    }, [cartInfo]);
    useEffect(() => {
        getCartItems();
    }, [showCouponModal]);

    useEffect(() => {
        if (userAddress) {
            CreatePaymentCollection();
        }
    }, [userAddress]);

    useEffect(() => {
        if (paymentCollection) {
            PutTaxesInCart();
        }
    }, [paymentCollection]);


    useEffect(() => {
        if (tax) {
            IntiatePaymentSession();
        }
    }, [tax]);

 
    //getting access token
    function getAccessToken() {
        GetAccessTokenAPI()
            .then((response) => {
                if (response && 'message' in response && response.message === 'Refresh token is missing!') {
                     window.location.href='/';
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

    //get cart items
    function getCartItems() {
        GetCartItemsApi(cartInfo.cart_id)
            .then((response) => {
                // console.log(response);
                setCartItems(response.cart);

            })
            .catch((error) => {
                console.error(error);
            });
    }

    //add shipping method
    function AddShippingMethod() {
        let obj = {
            "option_id": "so_01JE68TCMQVJTGQWHYZPT6A28H"
        };
        AddShippingMethodsApi(obj, cartInfo.cart_id)
            .then(() => {
                // setShippingId(response?.cart);
            })
            .catch((error) => {
                console.error(error);

            });

    }

    //create payment collection
    function CreatePaymentCollection() {
        // Fetch the data when the component mounts
        let obj = {
            "cart_id": cartInfo.cart_id

        };
        CreatePaymentCollectionApi(obj)
            .then((response) => {
                if (response && response?.payment_collection) {
                    setPaymentCollection(response?.payment_collection); // Store the payment collection in state
                }
            })
            .catch((err) => {
                console.error("Error fetching payment collection:", err);
            });
    }

    //get payment provider list
    function getPaymentProviderList() {
        // Fetch the data when the component mounts

        GetPaymentProviderList()
            .then(() => {
                // if (response && 'payment_providers' in response) {
                //     setPaymentProvidersList(response.payment_providers);
                // }
            })
            .catch((err) => {
                console.error("Error fetching payment collection:", err);
            });
    }

    //create payment collection
    function IntiatePaymentSession() {
        // Fetch the data when the component mounts
        let obj = {
            "provider_id": "pp_razorpay_razorpay",
            "context": {
                "extra": tax
            }
        };

        IntiatePaymentApi(obj, paymentCollection?.id)
            .then((response) => {
                if (response && 'payment_collection' in response) {
                    setOrderDetails(response.payment_collection);
                }
            })
            .catch((err) => {
                console.error("Error fetching payment collection:", err);
            });
    }

    let getAddress=useCallback(()=>{
        GetAddressApi(accessToken)
            .then((response) => {
                if (response && 'response' in response && response?.response && 'addresses' in response.response) {
                    setUserAddress(response?.response?.addresses);
                    let length = response?.response.addresses.length - 1;
                    setInvalidAddress(!response?.response?.addresses[length]?.address_1);

                    let Addresses = response?.response?.addresses[length];
                    //removing unwanted properties
                    delete Addresses?.company;
                    delete Addresses?.address_2;
                    delete Addresses?.metadata;
                    delete Addresses?.created_at;
                    delete Addresses?.updated_at;
                    delete Addresses?.customer_id;
                    delete Addresses?.id;


                    let billingAddresses = Addresses;
                    let shipping_address = Addresses;




                    let createCartObj = {
                        "billing_address": billingAddresses,
                        "shipping_address": shipping_address
                    };

                    CreateCartApi(createCartObj, cartInfo.cart_id)
                        .then(() => {
                        })
                        .catch((error) => {
                            console.error(error);
                        });

                }
            });
    },[]);

    function PutTaxesInCart() {
        TaxesApi(cartInfo.cart_id)
            .then((response) => {
                if (response) {
                    setTax(response.cart);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    let handleDeleteCouponCode=useCallback(()=>{
        let CouponCode=cartItems?.promotions[(cartItems?.promotions?.length) - 1]?.code;
        let removeObj = {
            "promo_codes": [CouponCode]
        };
        RemoveCouponCodeApi(removeObj, cartInfo?.cart_id)
            .then((response) => {
                if (response && 'cart' in response) {
                    getCartItems();
                }
            })
            .catch(() => {

            });
    },[]);

    let handleProceedToPay=useCallback(()=>{
        try {


            setInvalidAddress(!userAddress[userAddress.length - 1]?.address_1);
            if (!userAddress[userAddress.length - 1]?.address_1) {
                return;
            }


            const options = {
                key: process.env.RAZORPAY_KEY, // Replace with Razorpay Test/Live Key ID
                amount: orderDetails?.payment_sessions[0]?.data?.amount, // Amount from Razorpay Order
                currency: 'INR', // Currency from Razorpay Order
                order_id: orderDetails?.payment_sessions[0]?.data?.id, // Razorpay Order ID
                name: cartInfo?.details_data?.first_name,
                // callback_url: `https://medusa.payppy.in/razorpay/hooks`,
                description: 'Payment for product/service',
                // image: '/your-logo.png', // Optional logo
                handler: (response) => {
                    // Handle successful payment here
                    if (response && 'razorpay_payment_id' in response) {
                        //if payment sucessfull then first generate the order id from medusa 
                        GenerateOrderApi(cartInfo.cart_id)
                            .then((response) => {
                                if (response && 'order' in response) {

                                    //then delete the cart id that has been used 
                                    DeleteCartIdApi(accessToken)
                                        .then()
                                        .catch()
                                        .finally(() => {
                                            window.location.href = '/store/order-complete?url=' + response?.order.id;
                                        });
                                }

                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }
                },
                "prefill": {
                    "name": cartInfo?.details_data?.first_name, // Customer's name
                    "email": cartInfo?.email, // Customer's email
                    "contact": cartInfo?.details_data?.phone_number, // Customer's phone
                },
                theme: {
                    color: '#3399cc', // Optional custom theme color
                },
            };

            const razorpayInstance = new Razorpay(options);
            razorpayInstance.open();

            // Handling Razorpay errors
            razorpayInstance.on('payment.failed', function (response) {
                console.error('Payment failed:', response.error);
                // alert('Payment failed. Please try again or contact support.');
                window.location.href = '/store/order-fail?url=' + orderDetails?.payment_sessions[0]?.data?.id;
            });

        } catch (error) {
            console.error(error);

        }
    },[]);

    let handleAddressClick=useCallback(()=>{
        setShowModal(!showModal);
    },[showModal]);
    let handleBackClick=useCallback(()=>{
        router.push('/store/shopping-bag');
    },[]);

    let handleUserClickOnCouponCode=useCallback(()=>{
        if (cartItems?.promotions?.length === 1) {
            return;
        }
        setShowCouponModal(true);
    },[]);

    let handleModalTrue=useCallback(()=>{
        setShowModal(true);
    },[]);

    let toggleSelectedTerms=useCallback(()=>{
        setSelectedTerms(!selectedTerms); 
    },[]);
    return (
        <>
           {gettingAccessToken? <IntialLoadingAnimation/> 
           : <section className={`flex justify-center  w-full  background-custom-grey50 `}>
                <div className="page-center-parent-container   background-custom-grey50  overflow-scrollbar-hidden relative">
                    <div className="small-border border-black min-h-screen flex flex-col ">


                        {/* navbar  */}
                        <div className="relative flex items-center justify-center py-3.5 px-4 background-custom-grey50">
                            <button onClick={handleBackClick} className='absolute top-4 left-3.5'>
                                <Image src={CloseIcon} width={20} height={20} alt="img" quality={100} className="" />
                            </button>
                            <h4 className="heading-h4 custom-text-grey900">Review & Pay</h4>
                        </div>


                        {/* contatct details */}
                        <div className="background-custom-grey50 py-7 px-6 flex gap-2 justify-start items-start small-border-top custom-border-grey800">
                            <Image src={UserIcon} width={20} height={20} alt="img" quality={100} className="" />
                            <div className="flex flex-col gap-2 ">
                                <div className="all-caps-12 custom-text-grey900">Contact Details</div>
                                <div className="flex flex-col gap-1">
                                    <div className="body-sm-bold custom-text-grey900">{(cartInfo?.details_data?.first_name || "") + " " + (cartInfo?.details_data?.last_name || "")}</div>
                                    <div className="flex items-center gap-2">
                                        <div className="body-sm-bold custom-text-grey900"> {cartInfo?.details_data?.phone_number || ""}</div>
                                        <div className=" w-[0.5px] h-[18px] background-custom-grey900"></div>
                                        <div className="body-sm-bold custom-text-grey900">{cartInfo?.email || ""}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shipping details */}
                        {userAddress?.length < 1 ? <button className="background-custom-grey50 w-full py-7 px-6 flex gap-2 justify-between items-start small-border-top custom-border-grey800" onClick={handleAddressClick}>
                            <div className="flex items-center gap-2 ">
                                <Image src={Location} width={20} height={20} alt="img" quality={100} className="" />
                                <div className="all-caps-12 custom-text-grey900">Add Address</div>
                            </div>
                            <Image src={Arrow} width={20} height={20} alt="img" quality={100} className="" />
                        </button>
                            : <div className="background-custom-grey50 py-7 px-6 flex gap-2 justify-between items-start small-border-top custom-border-grey800">

                                <div className="flex gap-2  items-start">
                                    <Image src={Location} width={20} height={20} alt="img" quality={100} className="" />
                                    <div className="flex flex-col gap-2 ">
                                        <div className="all-caps-12 custom-text-grey900">Shipping to</div>
                                        <div className="flex flex-col gap-1">
                                            {/* <div className="body-sm-bold custom-text-grey900">{cartInfo?.details_data?.first_name + " "+cartInfo?.details_data?.last_name}</div> */}
                                            <div className="body-sm-bold custom-text-grey900">{userAddress[userAddress.length - 1]?.address_1 || ""}
                                                <br />{userAddress[userAddress.length - 1]?.city || ""}, {userAddress[userAddress.length - 1]?.province || ""}, {userAddress[userAddress.length - 1]?.postal_code || ""}</div>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={handleModalTrue}>
                                    <Image src={EditIcon} width={20} height={20} alt="img" quality={100} />
                                </button>
                            </div>
                        }
                        {/* Apply coupon code details */}
                        <div className="flex flex-col gap-4 py-7 background-custom-grey50 small-border-top custom-border-grey800">
                            <div className={` w-full  px-6  flex gap-2 justify-between items-start  ${cartItems?.promotions?.length === 0 ? ' cursor-pointer ':''}`} onClick={handleUserClickOnCouponCode}>
                                <div className="flex items-center gap-2 ">
                                    <Image src={Offer} width={20} height={20} alt="img" quality={100} className="" />
                                    <div className="all-caps-12 custom-text-grey900">Apply coupon code</div>
                                </div>
                                {cartItems?.promotions?.length === 0 && <button >
                                    <Image src={Arrow} width={20} height={20} alt="img" quality={100} className="" />
                                </button>}
                            </div>
                            {cartItems?.promotions?.length > 0 && <div className="flex items-center gap-3 px-12">
                                <div className="flex items-center gap-1.5 small-border border custom-border-grey400 p-2 pr-3">
                                    <Image src={CheckLine} width={16} height={16} alt="img" quality={100} className="" />
                                    <div className="all-caps-12-bold custom-text-grey900">{cartItems?.promotions[(cartItems?.promotions?.length) - 1]?.code || ""}</div>
                                </div>
                                <button onClick={handleDeleteCouponCode}>
                                    <Image src={CouponCross} width={24} height={24} alt="img" quality={100} className="" />
                                </button>

                            </div>
                            }
                        </div>

                        {/* Delivery details */}
                        <div className="background-custom-grey50 py-7 px-6 flex gap-2 justify-between items-start small-border-top custom-border-grey800">
                            <div className="flex items-center gap-2 ">
                                <Image src={Availability} width={20} height={20} alt="img" quality={100} className="" />
                                <div className="body-sm-bold custom-text-grey900">Expected Delivery:  3-5 Days</div>
                            </div>
                        </div>


                        <div className="px-6 py-8 background-custom-grey100 relative h-auto mt-auto self-end w-full">
                            <Image src={Subtract} width={524} height={20} alt="img" quality={100} className=" w-full object-cover absolute left-0 -top-2 z-[1]" />


                            <div className="flex flex-col gap-4  relative z-[2]">
                                <button className="py-[5px] px-2 flex items-center gap-1 ">
                                    <Image src={Store} width={20} height={20} alt="img" quality={100} className="" />
                                    <div className="all-caps-12 custom-text-grey900">Order Summary</div>
                                </button>
                                <div className="flex flex-col gap-2 py-4 ">
                                    <div className="flex justify-between">
                                        <div className="all-caps-10 custom-text-grey900">Subtotal:</div>
                                        <div className="all-caps-12-bold custom-text-grey800">₹{cartItems?.original_total}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="all-caps-10 custom-text-grey900">Shipping:</div>
                                        <div className="all-caps-10-bold custom-text-grey900">FREE</div>
                                    </div>
                                </div>

                                {/* if there is any coupon code  */}
                                {cartItems?.promotions?.length > 0 && <>
                                    <DashedBorder />


                                    <div className="flex justify-between  ">
                                        <div className="all-caps-10 custom-text-grey900">Coupon Discount:</div>
                                        <div className="all-caps-12-bold custom-text-grey800">-₹{cartItems?.discount_total?.toFixed(2)}</div>
                                    </div>

                                </>}
                                <DashedBorder />

                                <div className="flex justify-between  ">
                                    <div className="all-caps-12 custom-text-grey900">Total</div>
                                    <div className="flex flex-col items-end gap-1.5">
                                        <div className="flex items-center ">
                                            <div className="all-caps-12-bold custom-text-grey800">₹{cartItems?.total}</div>
                                        </div>
                                        <div className="all-caps-10 custom-text-grey900">GST INCLUDED</div>
                                    </div>
                                </div>



                                <div className="flex flex-col gap-4">
                                    <div className="flex gap-2 items-center">
                                        <div className={`w-4 h-4 small-border custom-border-grey800 ${selectedTerms ? ' bg-black ' : ' small-border bg-white border-black '}  relative cursor-pointer`} onClick={toggleSelectedTerms}>
                                            {selectedTerms && <Image src={CheckIcon} width={12} height={12} alt="img" quality={100} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 brightness-[100]" />}
                                        </div>
                                        <div className="body-sm custom-text-grey900"> I have read and agree to the website <Link href={'/my-account/legal-policies-and-more/terms-of-use'} className='font-semibold '>terms and conditions *</Link></div>
                                    </div>
                                    {invalidAddress && <span className="body-sm text-red-600">Please Enter Valid Address</span>}
                                    <button className={`text-center all-caps-12-bold  custom-text-white px-5 py-4 ${!selectedTerms || cartItems?.items.length === 0 ? ' background-custom-grey500 ' : '  bg-black '}`} disabled={!selectedTerms || cartItems?.items.length === 0} onClick={handleProceedToPay}>Proceed to Pay</button>
                                    <div className="flex justify-center items-center  gap-2">
                                        <div className="all-caps-12 custom-text-grey700">Secured by</div>
                                        <Image src={RazorpayIcon} width={74} height={16} alt="img" quality={100} className="" />
                                    </div>

                                </div>

                            </div>

                        </div>


                        <ManageAddress showModal={showModal} setShowModal={setShowModal} userInfo={cartInfo} accessToken={accessToken} getAddress={getAddress} houseNoprops={userAddress[userAddress.length - 1]?.address_1} apartmentNoprops={userAddress[userAddress.length - 1]?.address_2} cityProps={userAddress[userAddress.length - 1]?.city} zipcodeprops={userAddress[userAddress.length - 1]?.postal_code} />
                        <CouponModal showCouponModal={showCouponModal} setShowCouponModal={setShowCouponModal} cartId={cartInfo?.cart_id} />
                    </div>

                </div>
            </section>
}
        </>
    );
}

export default CheckoutSection;

