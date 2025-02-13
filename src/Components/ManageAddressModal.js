'use client';
import { useCallback, useEffect, useRef, useState } from "react";
import LoadingAnimation from "../app/auth/LoadingAnimation";
import CreateAddressApi from "../apis/store/CreateAddressApi";
import SanitizeInputs from '@/SanitizingInputs/SanitizeInputs';
import CreateCartApi from "@/apis/store/CreateCartApi";
import GetAddressApi from "@/apis/store/GetAddressApi";
import PropTypes from 'prop-types';


const states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Jammu and Kashmir',
    'Ladakh',
    'Lakshadweep',
    'Puducherry',
  ];

function ManageAddress({ showModal, setShowModal, accessToken, userInfo, getAddress }) {
    let [loadingAnimation, setLoadingAnimation] = useState(false);
    let [houseNo, setHouseNo] = useState("");
    let [apartmentNo, setApartmentNo] = useState("");
    let [zipcode, setZipcode] = useState("");
    let [city, setCity] = useState("");
    let [state, setState] = useState("");
    let [country, setCountry] = useState("");

    let [invalidFields, setInvalidFields] = useState(false);

    let modalRef = useRef();
    const lastScrollTop = useRef(0); // To keep track of the previous scroll position

    useEffect(() => {

        function handleOutsideClick(e) {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setShowModal(false);
            }
        }

        function handleScroll() {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollThreshold = 100; // Define the scroll threshold

            // Check if user has scrolled down more than the threshold
            if (currentScrollTop - lastScrollTop.current > scrollThreshold) {
                setShowModal(false);
            }

            lastScrollTop.current = currentScrollTop; // Update last scroll position
        }

        function handleTouchStart(e) {
            // Record the initial touch position
            lastScrollTop.current = e.touches[0].clientY;
        }

        function handleTouchMove(e) {
            const currentTouchY = e.touches[0].clientY;
            const scrollThreshold = 50; // Define the scroll threshold for closing

            // Check if the user is scrolling down significantly
            if (lastScrollTop.current - currentTouchY > scrollThreshold) {
                setShowModal(false);
            }
        }
        document.addEventListener('click', handleOutsideClick);
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);
        return ()=>{
            document.removeEventListener('click', handleOutsideClick);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [showModal]);

    //to handle input of houseNo name
    let handleHouseNoInput=useCallback((e)=>{
        let sanitizedValue = SanitizeInputs(e.target.value);
        setHouseNo(sanitizedValue);
    },[houseNo]);

    // to handle input of state 
    let handleStateInput=useCallback((e)=>{
        let sanitizedValue = SanitizeInputs(e.target.value);
        setState(sanitizedValue);
    },[state]);

    //to handle input of Zipcode
    let handleZipcodeInput=useCallback((e)=>{
        let sanitizedValue = SanitizeInputs(e.target.value);
        setZipcode(sanitizedValue);
    },[]);

    //to handle input of City name
    let handleCityInput=useCallback((e)=>{
        let sanitizedValue = SanitizeInputs(e.target.value);
        setCity(sanitizedValue);
    },[]);

    let closeModal=useCallback(()=>{
        setShowModal(false);
    },[showModal]);


    //to get users last updated address
    useEffect(()=>{
        if(accessToken)
        {
            getUsersLastAddress();
        }
    },[showModal]);

    let handleCreateAddress=useCallback(()=>{

        if (houseNo.length < 0 || apartmentNo.length < 0 || zipcode.length < 0 || city.length < 0 || state.length < 0 || country.length < 0) {
            setInvalidFields(true);
            return;
        }
        setLoadingAnimation(true);
        setInvalidFields(false);

        let obj = {
            "first_name": userInfo?.details_data?.first_name,
            "last_name": userInfo?.details_data?.last_name,
            "phone": userInfo?.details_data?.phone_number,
            "address_1": houseNo,
            // "address_2": apartmentNo,
            "city": city,
            "country_code": 'in',
            "province": state,
            "postal_code": zipcode,
            // "address_name": "{value}"
            // "Is_default_shipping":true,
            // "is_default_billing":true

        };

        CreateAddressApi(obj, accessToken)
            .then((response) => {
                
                if (response) {

                    let createCartObj={
                        "billing_address": obj,
                        "shipping_address": obj
                    };

                    CreateCartApi(createCartObj,userInfo.cart_id)
                    .then(()=>{  
                        setHouseNo('');
                        setApartmentNo('');
                        setZipcode('');
                        setCity('');
                        setState('');
                        setCountry('');
                        setShowModal(false);
                        getAddress();
                    })
                    .catch((error)=>{
                        console.error(error);
                        
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoadingAnimation(false);
            });
    },[]);

    let getUsersLastAddress=useCallback(()=>
    {
        GetAddressApi(accessToken)
        .then((response)=>{
            
            if(response&&'response' in response&&response?.response&&'addresses' in response.response)
                {
                    let addresses=response?.response?.addresses;
    
                    setHouseNo(addresses[addresses.length-1]?.address_1 || "");
                    // setApartmentNo(addresses[addresses.length-1]?.address_2 || "");
                    setCity(addresses[addresses.length-1]?.city || "");
                    setZipcode(addresses[addresses.length-1]?.postal_code || "");
                    setState(addresses[addresses.length-1]?.province || "");
                }
        })
        .catch();
            
    },[]);
    return (
        <div className="       ">
            <div className={`w-full sm:w-[52.7vh] min-w-[340px] sm:min-w-[360px]  !min-h-[520px]  px-6  background-custom-grey50  mt-auto duration-500 small-border border-black fixed left-[50%] -translate-x-[50%] z-[2] ${showModal ? ' bottom-0 overflow-scroll pb-10 pt-2  ' : '  -bottom-[100%]  overflow-hidden '} `} ref={modalRef} >
                <div className="flex flex-col gap-8">

                <div className="flex justify-center items-center">
                    <div className="w-12 h-0.5 background-custom-grey400 cursor-pointer px-2" onClick={closeModal}></div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <h2 className="heading-h2 text-center custom-text-grey900">Manage address</h2>
                    <div className="body font-normal custom-text-grey700 text-center">Enter or edit your address for accurate delivery</div>
                </div>

                <div className="flex flex-col gap-6 ">

                    <div className="flex flex-col gap-1.5">
                        <div className="all-caps-12-bold custom-text-grey900 uppercase">house/flat number, Street Name</div>
                        <input type="text" value={houseNo} onChange={handleHouseNoInput} className='w-full border-[0.5px] custom-border-grey800 outline-none py-3.5 px-5 ' />
                        {/* {invalidEmail&&email.length>0&&<span className="custom-text-alert body-sm">Please enter a valid email address</span>} */}
                    </div>

                     {/* <div className="flex flex-col gap-1.5"> */}

                        {/* <div className="all-caps-12-bold custom-text-grey900 uppercase">apartment, suite (Optional)</div> */}
                        {/* <input type="text" value={apartmentNo} onChange={handleapartmentInput} name="password" className='w-full border-[0.5px] custom-border-grey800 outline-none py-3.5 px-5 ' /> */}
                        {/* {invalidEmail&&email.length>0&&<span className="custom-text-alert body-sm">Please enter a valid email address</span>} */}
                    {/* </div>  */}

                    <div className="flex items-center gap-3 w-full">
                        <div className="flex flex-col gap-1.5 grow">
                            <div className="all-caps-12-bold custom-text-grey900 uppercase">Zipcode</div>
                            <input type="tel" value={zipcode} onChange={handleZipcodeInput} className='w-full border-[0.5px] custom-border-grey800 outline-none py-3.5 px-5 ' />
                            {/* {invalidEmail&&email.length>0&&<span className="custom-text-alert body-sm">Please enter a valid email address</span>} */}
                        </div>

                        <div className="flex flex-col gap-1.5 grow">
                            <div className="all-caps-12-bold custom-text-grey900 uppercase">City</div>
                            <input type="text" value={city} onChange={handleCityInput} className='w-full border-[0.5px] custom-border-grey800 outline-none py-3.5 px-5 ' />
                            {/* {invalidEmail&&email.length>0&&<span className="custom-text-alert body-sm">Please enter a valid email address</span>} */}
                        </div>

                    </div>

                    <div className="flex items-center gap-3 w-full ">
                        <div className="flex flex-col gap-1.5 grow">
                            <div className="all-caps-12-bold custom-text-grey900 uppercase">State</div>
                            <select
                                id="state"
                                name="state"
                                className="w-full border-[0.5px] custom-border-grey800 outline-none py-3.5 px-5 "
                                defaultValue=""
                                onChange={handleStateInput}
                            >
                                <option value="" disabled>
                                    -- Select a State --
                                </option>
                                {states.map((state, index) => (
                                    <option key={index} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                            {/* <input type="text" value={state} onChange={handleStateInput} className='w-full border-[0.5px] custom-border-grey800 outline-none py-3.5 px-5 ' /> */}
                            {/* {invalidEmail&&email.length>0&&<span className="custom-text-alert body-sm">Please enter a valid email address</span>} */}
                        </div>

                        {/* <div className="flex flex-col gap-1.5 grow"> */}
                            {/* <div className="all-caps-12-bold custom-text-grey900 uppercase">Country</div> */}
                            {/* <input type="text" value={country} onChange={handleCountryInput} className='w-full border-[0.5px] custom-border-grey800 outline-none py-3.5 px-5 ' /> */}
                            {/* {invalidEmail&&email.length>0&&<span className="custom-text-alert body-sm">Please enter a valid email address</span>} */}
                        {/* </div> */}

                    </div>



                   {invalidFields& <div className=""></div>}
                    <div className="flex flex-col gap-2">
                        <button className={`py-4 px-7 w-full flex justify-center items-center shadow-sm custom-text-white all-caps-12 text-center   bg-black `} onClick={handleCreateAddress}  >{loadingAnimation ? <LoadingAnimation borderColor='border-white' /> : <span>Save and Continue</span>}</button>
                    </div>





                </div>
                </div>

            </div>
        </div>
    );
}


export default ManageAddress;

ManageAddress.propTypes={
    showModal:PropTypes.bool,
    setShowModal:PropTypes.func,
    accessToken:PropTypes.string,
    userInfo:PropTypes.string,
    getAddress:PropTypes.func,
};