'use client';

import PropTypes from 'prop-types';
import { useCallback } from 'react';

const CartEmptyViewComponent = ({title}) => {
  return (
      <>
         <div className="flex flex-col items-center gap-5 max-w-[312px] w-full">
              <div className="text-center custom-text-grey800 all-caps-14">{title}</div>
              <div className="flex w-full gap-5 items-center  ">
                <ShopButton catagory={'men'} text={'Shop men'} /> 
                <ShopButton catagory={'women'} text={'Shop Women'} /> 
              </div>
              <ShopButton catagory={'accessories'} text={'Shop Accessories'} /> 

          </div>


      </>
  );
};

export default CartEmptyViewComponent;


function ShopButton({catagory,text})
{
    let handleOnClick=useCallback(()=>{
        window.location.href='/?catagory='+catagory;
    },[catagory]);
    return(
        <>
                  <button className="small-border border-black py-4 px-7 custom-text-grey900 grow all-caps-12-bold" onClick={handleOnClick}>{text}</button>
        </>
    );
}

CartEmptyViewComponent.propTypes={
    title:PropTypes.string
};

ShopButton.propTypes={
    catagory:PropTypes.string,
    text:PropTypes.string,
};