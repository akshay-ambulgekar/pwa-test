import React from "react";
import Image from "next/image";

//Images
import FlixPerformance from '@/Images/Dashboard/FlixPerformance.png';

//icons
import Play from '@/Images/Dashboard/play.svg';
import Heart from '@/Images/Dashboard/heart.svg';
import Bookmark from '@/Images/Dashboard/bookmark.svg';

import PropTypes from 'prop-types';

const DashBoardFlixPerformance = ({ num }) => {
    return (
        
        <section className=" gap-5 flex pt-4 ">

            {/* num */}
            <h3 className="heading-h3 custom-text-grey900 flex items-center">{num}.</h3>

            <div className=" gap-3 pl-2 ">
                <Image src={FlixPerformance} width={73} height={130} alt="img" quality={100} className="border custom-border-grey200 rounded" />
            </div>

            <div className="py-1 flex flex-col justify-between ">
                <div className=" gap-1">
                    <p className="body-sm-bold custom-text-grey900"> A team of Beginnings with new styles </p>
                </div>

                {/* icons */}
                <div className=" gap-4 flex ">
                    <span className="gap-1 flex ">
                        <Image src={Play} width={16} height={16} alt="img" quality={100} />
                        <p className="body-sm-bold custom-text-grey900"> 26.2M</p>
                    </span>

                    <span className="gap-1 flex ">
                        <Image src={Heart} width={16} height={16} alt="img" quality={100} />
                        <p className="body-sm-bold custom-text-grey900"> 43.1K </p>
                    </span>
                    <span className="gap-1 flex ">
                        <Image src={Bookmark} width={16} height={16} alt="img" quality={100} />
                        <p className="body-sm-bold custom-text-grey900"> 8K </p>
                    </span>

                </div>
            </div>

        </section>

    );
};

export default DashBoardFlixPerformance;

DashBoardFlixPerformance.propTypes = {
    num:PropTypes.number,
};







// import React from "react";
// import Image from "next/image";

// //Images
// import FlixPerformance from '@/Images/Dashboard/FlixPerformance.png';

// //icons
// import Play from '@/Images/Dashboard/play.svg';
// import Heart from '@/Images/Dashboard/heart.svg';
// import Bookmark from '@/Images/Dashboard/bookmark.svg';

// const DashBoardFlixPerformance = ({ num }) => {
//     return (
//         <section className=" gap-5 flex mb-5 ">

//             <h3 className="heading-h3 custom-text-grey900 flex items-center">{num}.</h3>

//             <div className=" gap-3 pl-3">
//                 <Image src={FlixPerformance} width={73} height={130} alt="img" quality={100} className="border custom-border-grey200 rounded" />
//             </div>

//             <div className="py-1 flex flex-col justify-between max-w-[125px]">
//                 <p className="body-sm-bold custom-text-grey900"> A team of Beginnings with new styles </p>
//                 <div className=" gap-4 flex ">
//                     <span className="gap-1 flex ">
//                         <Image src={Play} width={16} height={16} alt="img" quality={100} />
//                         <p className="body-sm-bold custom-text-grey900"> 26.2M</p>
//                     </span>

//                     <span className="gap-1 flex ">
//                         <Image src={Heart} width={16} height={16} alt="img" quality={100} />
//                         <p className="body-sm-bold custom-text-grey900"> 43.1K </p>
//                     </span>
//                 </div>
//             </div>

//             <div className="flex flex-col py-1  justify-end">
//                 <span className="gap-1 flex ">
//                     <Image src={Bookmark} width={16} height={16} alt="img" quality={100} />
//                     <p className="body-sm-bold custom-text-grey900"> 8K </p>
//                 </span>
//             </div>

//         </section>
//     );
// };

// export default DashBoardFlixPerformance;
