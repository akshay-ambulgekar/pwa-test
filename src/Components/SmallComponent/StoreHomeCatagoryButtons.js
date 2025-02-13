import PropTypes from 'prop-types';
import { useCallback } from 'react';
function StoreHomeCatagoryButtons({ catagory ,selectedCatagory,handleProductCatagory }) {

    let handleProductCatagoryClick =useCallback(()=>
    {
        handleProductCatagory(catagory);
    },[catagory]);

    return (
        <button className={`custom-text-grey800 ${selectedCatagory === catagory ? ' all-caps-10-bold' : ' all-caps-10 '}`} onClick={handleProductCatagoryClick}>{catagory}</button>
    );
}

export default StoreHomeCatagoryButtons;

StoreHomeCatagoryButtons.propTypes = {
    catagory: PropTypes.string,
    selectedCatagory:PropTypes.string,
    handleProductCatagory:PropTypes.func
};