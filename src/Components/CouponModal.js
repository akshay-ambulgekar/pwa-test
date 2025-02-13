'use client';
import { useCallback, useEffect, useRef, useState } from "react";
import LoadingAnimation from "../app/auth/LoadingAnimation";
import SanitizeInputs from "@/SanitizingInputs/SanitizeInputs";
import ApplyCouponCodeApi from "@/apis/store/ApplyCouponCodeApi";
import RemoveCouponCodeApi from "@/apis/store/RemoveCouponCodeApi";


import PropTypes from 'prop-types';
import CouponCodeBox from "./SmallComponent/CouponCodeBox";

function CouponModal({ showCouponModal , setShowCouponModal , cartId}) {
    let [loadingAnimation, setLoadingAnimation] = useState(false);
    let [couponCode,setCouponCode]=useState('');

    let [invalidFields, setInvalidFields] = useState(false);

    let modalRef = useRef();


    useEffect(() => {

        function handleOutsideClick(e) {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setShowCouponModal(false);
                setInvalidFields(false);
                setCouponCode('');
            }
        }
        document.addEventListener('click', handleOutsideClick);

        return ()=>{
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [showCouponModal,invalidFields]);

    //to handle input of houseNo name
    let handleCouponInput=useCallback((e) =>{
        let sanitizedValue = SanitizeInputs(e.target.value);
        sanitizedValue=sanitizedValue.toUpperCase();
        setCouponCode(sanitizedValue);
    });

    let closeModal=useCallback(()=> {
        setShowCouponModal(false);
    },[showCouponModal]);

    let handleEnterPress=useCallback((e)=>
    {
        if(e.key==='Enter')
        {
            handleApplyCouponCode();
        }
    },[]);

   
    let handleApplyCouponCode=useCallback((CouponCodeParameter=false)=> {

        if (couponCode.length === 0&&!CouponCodeParameter) {
            setInvalidFields(true);
            return;
        }
        setLoadingAnimation(true);
        setInvalidFields(false);

        let obj={
            "promo_codes": [couponCode || CouponCodeParameter]
          };
        ApplyCouponCodeApi(obj, cartId)
            .then((response) => {
                if(response&&'cart' in response)
                {
                    //if there is already coupon code present and current inputed coupon code is valid then remove all previous coupon codes
                    if(response?.cart?.promotions?.length>1)
                    {
                        
                        let arr=response?.cart?.promotions?.slice(0,-1)?.map(promotion => promotion?.code);
                        // response?.cart?.promotions?.forEach((element,index)=>{
                        //     arr.push(element.code);
                        // })

                        let removeObj={
                            "promo_codes": arr
                        };
                        RemoveCouponCodeApi(removeObj,cartId)
                        .then((response)=>{
                            if(response)
                            {
                                setCouponCode('');
                                setShowCouponModal(false);
                            }
                        })
                        .catch(()=>{
                            
                        })
                        .finally(()=>{
                            setCouponCode('');
                            setShowCouponModal(false);
                        });
                    }
                    else if(response?.cart?.promotions?.length===1)
                    {
                        setCouponCode('');
                        setShowCouponModal(false);
                    }
                    else{
                        setInvalidFields(true);
                        return;
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoadingAnimation(false);
            });
    },[couponCode,showCouponModal]);

   
            

    return (
        <div className="  ">
            <div className={`page-center-parent-container !min-h-[auto]   w-full  flex flex-col gap-8 px-6  background-custom-grey50   duration-500 small-border border-black fixed left-[50%] -translate-x-[50%] z-[2] ${showCouponModal ? ' bottom-0 pb-10 pt-2  ' : '  -bottom-[100%]  overflow-hidden '} `} ref={modalRef} >
                <div className="flex justify-center items-center">
                    <div className="w-12  background-custom-grey400 cursor-pointer  h-[2px]" onClick={closeModal}></div>
                </div>
                <div className="flex flex-col gap-2 ">
                    <h2 className="heading-h2  custom-text-grey900">Apply Coupon Code</h2>
                    <div className="body font-normal custom-text-grey700 ">Enter your coupon code to apply discounts to your order.</div>
                </div>

                <div className="flex flex-col gap-6 ">

                    <div className="flex flex-col gap-1.5">
                        <div className="all-caps-12-bold custom-text-grey900 uppercase">Coupon code</div>
                        <input type="text" value={couponCode} onChange={handleCouponInput} className='w-full border-[0.5px] custom-border-grey800 outline-none py-3.5 px-5 '  onKeyDown={handleEnterPress}/>
                        {invalidFields&&<span className="custom-text-alert body-sm">Please enter a valid Coupon code</span>}
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="custom-text-grey600 all-caps-10-bold">available Coupons</div>
                        <div className="grid grid-cols-2 gap-3">
                            <CouponCodeBox couponCode={'BYE24'} Description={'Get 24% Off on this order'} handleApplyCouponCode={handleApplyCouponCode} />

                            {/* <div className="flex flex-col gap-3 small-border border custom-border-grey400 p-4  cursor-pointer bg-[#ffffff6e]" onClick={()=>{handleApplyCouponCode('BYE24');}}>
                                <div className="flex flex-col gap-1.5">
                                    <div className="all-caps-14-bold custom-text-grey800">BYE24</div>
                                    <div className="body-sm custom-text-grey600">Get 24% Off on this order </div>
                                </div>
                                <div className="">
                                    <button className="custom-text-grey900 body-sm-bold underline" >Apply</button>
                                   
                                </div>
                            </div> */}
                           
                        </div>
                    </div>

                    

                    <div className="flex flex-col gap-2">
                        <button className={`py-4 px-7 w-full flex justify-center items-center shadow-sm custom-text-white all-caps-12 text-center   bg-black `} onClick={handleApplyCouponCode} disabled={loadingAnimation} >{loadingAnimation ? <LoadingAnimation borderColor='border-white' /> : <span>Apply Coupon</span>}</button>
                    </div>





                </div>
            </div>
        </div>
    );
}


export default CouponModal;

CouponModal.propTypes={
    showCouponModal:PropTypes.bool,
    setShowCouponModal:PropTypes.func,
    cartId:PropTypes.func
};