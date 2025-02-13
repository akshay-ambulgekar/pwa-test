import React from "react";
import Image from "next/image";

//icons
import Heart from '@/Images/Dashboard/heart.svg';
import Cart from '@/Images/Dashboard/shopping-cart.svg';
import Bag from '@/Images/Dashboard/shopping-bag.svg';

import PropTypes from 'prop-types';

const DashBoardTopSellingProduct = ({ num, productName, price, imgSrc }) => {
    return (
        <section className=" gap-5 flex pt-6 ">

            {/* num */}
            <h3 className="heading-h3 custom-text-grey900 flex items-center">{num}.</h3>

            <div className=" gap-3 pl-2 ">
                <Image src={imgSrc} width={73} height={130} alt="img" quality={100} className="border custom-border-grey200 rounded" />
            </div>

            <div className="py-1 flex flex-col justify-between ">
                <div className=" gap-1">
                    <p className="body-sm-bold custom-text-grey900"> {productName}</p>
                    <p className="body-sm-bold custom-text-grey900"> ₹ {price}</p>
                </div>

                {/* icons */}
                <div className=" gap-4 flex ">
                    <span className="gap-1 flex ">
                        <Image src={Heart} width={16} height={16} alt="img" quality={100} />
                        <p className="body-sm-bold custom-text-grey900"> 46</p>
                    </span>

                    <span className="gap-1 flex ">
                        <Image src={Cart} width={16} height={16} alt="img" quality={100} />
                        <p className="body-sm-bold custom-text-grey900"> 32 </p>
                    </span>
                    <span className="gap-1 flex ">
                        <Image src={Bag} width={16} height={16} alt="img" quality={100} />
                        <p className="body-sm-bold custom-text-grey900"> 12 </p>
                    </span>

                </div>
            </div>

        </section>
    );
};

export default DashBoardTopSellingProduct;

DashBoardTopSellingProduct.propTypes = {
    num: PropTypes.number,
    productName: PropTypes.string,
    price: PropTypes.number,
    imgSrc: PropTypes.any,
};
