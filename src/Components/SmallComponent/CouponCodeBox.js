import PropTypes from 'prop-types';
import { useCallback } from 'react';
function CouponCodeBox({ couponCode, Description , handleApplyCouponCode }) {

    let handleCouponCodeClicked =useCallback(()=>
    {
        handleApplyCouponCode(couponCode);
    },[couponCode]);

    return (
        <div className="flex flex-col gap-3 small-border border custom-border-grey400 p-4  cursor-pointer bg-[#ffffff6e]" onClick={handleCouponCodeClicked}>
            <div className="flex flex-col gap-1.5">
                <div className="all-caps-14-bold custom-text-grey800">{couponCode}</div>
                <div className="body-sm custom-text-grey600">{Description}</div>
            </div>
            <div className="">
                <button className="custom-text-grey900 body-sm-bold underline" >Apply</button>
            </div>
        </div>
    );
}

export default CouponCodeBox;

CouponCodeBox.propTypes = {
    couponCode: PropTypes.string,
    Description: PropTypes.string,
    handleApplyCouponCode:PropTypes.func
};