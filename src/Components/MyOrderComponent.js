import React from "react";
import Image from "next/image";

//images
import RightArrow from '@/Images/Icons/chevron-right-icon-dark.svg';
import Link from "next/link";

import PropTypes from 'prop-types';


const MyOrderComponent = ({orderId,displayId,price,quantity,date,time,status}) => {

    let statusBackgroundColor={
        'processing':'background-custom-grey100',
        'shipped':'background-custom-grey800',
        'delivered':'bg-[#01C572]',
        'not_fulfilled':'bg-[#01C572]',
    };

    let statusColor={
        'processing':'custom-text-grey900',
        'shipped':'custom-text-white',
        'delivered':'custom-text-white',
        'not_fulfilled':'custom-text-white',
    };

    let statusBorderColor={
        'processing':'custom-border-grey300',
        'not_fulfilled':'custom-border-grey300',
        'shipped':'',
        'delivered':'',
    };

    return (
        <Link href={'/my-account/orders/'+orderId}>
            <div className="flex justify-between items-start small-border-bottom border-black py-7 px-6">
                <div className="flex flex-col  gap-2">
                    <div className="all-caps-12 custom-text-grey900">Order ID: #{displayId}</div>
                    <div className=" custom-text-grey900">
                        <span className="all-caps-12-bold">₹{price}</span>
                        {quantity>1&&<span className="all-caps-10"> ({quantity} items)</span>}
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="custom-text-grey600 all-caps-10">{date}</div>
                        <div className="w-[0.5px] h-3.5 background-custom-grey500"></div>
                        <div className="custom-text-grey600 all-caps-10">{time}</div>
                    </div>
                    <div className="flex">
                        <div className={`${statusBackgroundColor[status]} all-caps-10-bold ${statusColor[status]} small-border ${statusBorderColor[status]} py-1 px-2 `}>{status}</div>
                    </div>
                </div>
                <Image src={RightArrow} width={20} height={20} alt='img' quality={100} className='' />
            </div>
        </Link>

    );
};

export default MyOrderComponent;


MyOrderComponent.propTypes={
    orderId:PropTypes.string,
    displayId:PropTypes.number,
    price:PropTypes.number,
    quantity:PropTypes.number,
    date:PropTypes.string,
    time:PropTypes.string,
    status:PropTypes.string,
};