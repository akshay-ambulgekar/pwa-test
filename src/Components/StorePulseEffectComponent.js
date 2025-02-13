import PropTypes from 'prop-types';

function StorePulseEffectComponent({containerWidth})
{
    return(
        <>
            <div className={`animate-pulse flex flex-col  custom-border-grey800 flex-shrink-0 self-stretch scroll-smooth relative cursor-pointer ${containerWidth} small-border `} >
                {/* <Image src={Wishlist} width={16} height={16} alt="img" quality={100} className='absolute top-3 right-3 '  /> */}

                <div className=" small-border-bottom custom-border-grey800  h-[219px]  bg-slate-100 mix-blend-darken ">

                </div>
                <div className="p-2.5 pb-5  flex flex-col gap-2  justify-center ">
                    <div className="all-caps-10 custom-text-grey900 h-2 bg-slate-200  max-w-[160px] w-full text-ellipsis whitespace-nowrap overflow-hidden "></div>
                    <div className="all-caps-10 custom-text-grey900 h-2 bg-slate-200 max-w-[30px] w-full"></div>
                </div>

            </div>
        </>
    );
}

export default StorePulseEffectComponent;

StorePulseEffectComponent.propTypes={
    containerWidth:PropTypes.string,
};