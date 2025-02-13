'use client';
import StoreFooter from '@/Components/StoreFooter';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';


//added by yogesh
import Flix from '@/Images/Icons/flix-icon.svg';
import PayppyLogo from '@/Images/Icons/Payppy-Logo-white.svg';
import ArrowRigth from '@/Images/Icons/arrow-right.svg';
import MuteIcon from "@/Images/Icons/volume-mute.svg";
import UnmuteIcon from "@/Images/Icons/volume-on-icon.svg";


//hero section images
// import Homepage from '@/Images/Homepage/homepage-img.jpg';
// import Hero1 from '@/Images/Store/hero-image-1.jpg';
// import Hero2 from '@/Images/Store/hero-image-2.jpg';
// import Hero3 from '@/Images/Store/hero-image-3.jpg';



// import PayppyStoreLogo from '@/Images/Store/Payppy-Store-Logo.svg';


//filter section images
import SingleViewFilter from '@/Images/Store/single-view-filter.svg';
import SingleViewActiveFilter from '@/Images/Store/single-view-active-filter.svg';

import MultiViewFilter from '@/Images/Store/multi-view-filter.svg';
import MultiViewActiveFilter from '@/Images/Store/multi-view-active-filter.svg';

import StoreProductsListApi from '@/apis/store/StoreProductsListApi';
import ClothsImgInfoCompo from '@/Components/ClothsImgInfoCompo';
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import IntialLoadingAnimation from '@/Components/InitialPageLoadingAnimation';
import { useRouter } from 'next/navigation';
import LoadingAnimation from '@/app/auth/LoadingAnimation';
import StorePulseEffectComponent from '@/Components/StorePulseEffectComponent';
import { useSearchParams } from 'next/navigation';
import GetWishlistedProductsApi from '@/apis/store/GetWishlistedProductsApi';
import StoreHomeCatagoryButtons from '@/Components/SmallComponent/StoreHomeCatagoryButtons';




function StoreHomeSection() {

    let [gridColums, setGridColumns] = useState(2);
    let [products, setProducts] = useState([]);

    let [gettingAccessToken, setGettingAccessToken] = useState(true);
    let [accessToken, setAccessToken] = useState('');

    let [productsCount, setProductsCount] = useState(0);
    let [clickedLoadMoreCount, setClickedLoadMore] = useState(1);
    let [loadingAnimation, setLoadingAnimation] = useState(false);
    let [currentFilterId, setCurrentFilterId] = useState('');
    let [selectedCatagory, setSelectedCatagory] = useState('');

    let [wishlistedProducts, setwishlistedProducts] = useState([]);

    const [isMuted,setIsMuted] = useState(true);

    let router = useRouter();

    // const carouselRef = useRef(null);

    // const [activeIndex, setActiveIndex] = useState(0);

    let params = useSearchParams();

    let filterRef = useRef();

    let filterCatagories = {
        'men': 'pcat_01JE90TZWNW2N8SKKXYCKN711A',
        'women': 'pcat_01JF1SPYGN7HQKZA0YK9K2Z4BW',
        'accessories': 'pcat_01JFF47JZMV8QXD30HPQSXB4E4'
    };

    // const handleScroll = useCallback(() => {
    //     if (carouselRef.current) {
    //         const scrollLeft = carouselRef.current.scrollLeft;
    //         const itemWidth = carouselRef.current.offsetWidth;
    //         const index = Math.round(scrollLeft / itemWidth); // Calculate the active index
    //         setActiveIndex(index);
    //     }
    // },[]);

    useEffect(() => {
        FetchProducts();
    }, [clickedLoadMoreCount, selectedCatagory, currentFilterId]);

    //get access token intially
    useEffect(() => {
        getAccessToken();
    }, []);

    useEffect(() => {
        let queryFilter = params.get('catagory');
        if (queryFilter?.length > 0) {
            setSelectedCatagory(queryFilter);
            setCurrentFilterId(filterCatagories[queryFilter]);
            filterRef?.current?.scrollIntoView(
                {
                    block: 'start', // Align to the top of the viewport
                }
            );
        }
        else {
            setCurrentFilterId('');
            setSelectedCatagory('');
        }
    }, [params]);

    useEffect(() => {
        if (accessToken) {
            fetchWishlistedProducts();
        }
    }, [accessToken]);


    let handleProductCatagory=useCallback((catagory)=>{
        if (params.get('catagory') === catagory) {
            router.push('/');
        }
        else {
            router.push('/?catagory=' + catagory);
        }
    },[]);

    let limit = clickedLoadMoreCount * 50;

    let query = (selectedCatagory !== '') ? `?limit=${limit}&&region_id=reg_01JDPJAQ0EV727HP0MPZH1NZA9&fields=*variants.calculated_price&category_id=${currentFilterId}` : `?limit=${limit}&region_id=reg_01JDPJAQ0EV727HP0MPZH1NZA9&order=-id`;
    function FetchProducts() {
        setLoadingAnimation(true);
        setProducts('');
        setProductsCount('');
        StoreProductsListApi(query)
            .then((response) => {
                // console.log(response);
                setTimeout(() => {
                    setProducts(response?.products);
                    setProductsCount(response?.count);
                }, 500);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoadingAnimation(false);
            });

    }


    function getAccessToken() {
        setGettingAccessToken(true);
        GetAccessTokenAPI()
            .then((response) => {

                if (response && 'access_token' in response) {
                    setAccessToken(response.access_token);
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setGettingAccessToken(false);
            }
            );

    }

    let handleLoadMoreButtonClick=useCallback(()=>{
        let totalcount = products.length < productsCount;

        if (totalcount) {
            let totalClickedTime = clickedLoadMoreCount + 1;

            setClickedLoadMore(totalClickedTime);
        }
    },[clickedLoadMoreCount]);

    let fetchWishlistedProducts=useCallback(()=>{
        GetWishlistedProductsApi(accessToken)
            .then((response) => {
                if (response) {
                    if ('wishlist' in response) {
                        setwishlistedProducts(response?.wishlist);
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });
    },[accessToken]);

    //if click on login/signup button
    let handleLoginSignupClick=useCallback(()=>{
        router.push('/auth/user-auth');
    },[]);

    let handleVideo = useCallback(() => {
        router.push('/flix');
    }, []);

    const handleMuteToggle = useCallback(() => {
        setIsMuted(!isMuted);
    },[isMuted]);

    //select grid view
    let handleSingleViewClick=useCallback(()=>{
        setGridColumns(2);
    },[gridColums]);

    //select grid view
    let handleMultiViewClick=useCallback(()=>{
        setGridColumns(1);
    },[gridColums]);

    return (
        <>
            {gettingAccessToken ?
                <IntialLoadingAnimation />
                : <main >
                    <div className={"page-center-parent-container   overflow-scrollbar-hidden"}>
                    <div className=" relative   ">
                        {(!accessToken && !gettingAccessToken) && <button className="sticky top-0 z-[5] background-custom-green all-caps-12-bold custom-text-grey900 w-full text-center py-4 small-border border-black " onClick={handleLoginSignupClick} >Login/SignuP</button>}



                        {/* hero section  */}
                        <section className="h-[60vh] relative  overflow-hidden w-full">
                            {/* <div className="flex overflow-x-auto  overflow-scrollbar-hidden w-full h-full absolute z-0  top-0 left-0 snap-x-custom " ref={carouselRef} onScroll={handleScroll}>
                                <Image src={Hero1} width={400} height={675} alt='img' quality={100} className='w-full h-full  object-cover flex-shrink-0 snap-start-custom' />
                                <Image src={Hero2} width={400} height={675} alt='img' quality={100} className='w-full h-full  object-cover flex-shrink-0 snap-start-custom' />
                                <Image src={Hero3} width={400} height={675} alt='img' quality={100} className='w-full h-full  object-cover flex-shrink-0 snap-start-custom' />
                              

                              
                            </div> */}
                            {/* Dots */}
                            {/* <div className="absolute bottom-4 flex space-x-2 z-[3]">
                                {Array(3).fill(null).map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-2 h-2 rounded-full ${activeIndex === index ? 'bg-black' : 'bg-gray-300'
                                            }`}
                                    />
                                ))}
                            </div> */}

                            <video
                                className="h-full w-full aspect-auto object-cover max-w-none cursor-pointer"
                                onClick={handleVideo}
                                muted={isMuted}
                                autoPlay
                                playsInline // Ensures inline playback on iOS devices
                                loop
                            >
                                <source src="/flix-sample.mp4" type="video/mp4" />
                            </video>

                         
                          
                            
                            <Image src={PayppyLogo} width={217} height={36} alt='img' quality={100} className='absolute top-5 left-[50%] -translate-x-[50%] z-[1] ' />

                            <div className='absolute bottom-0 w-full bg-store-video-gradient gap-2.5 pt-16 pb-6 px-6 '>

                                <div className='flex justify-between items-center  '>

                                    <Link href="/flix" className='flex items-center gap-2 '>
                                        <Image src={Flix} width={24} height={24} alt='img' quality={100} className='z-[1]' />
                                        <div className=' gap-1 flex'>
                                            <span className='all-caps-10-bold custom-text-white '> Explore more</span>
                                            <Image src={ArrowRigth} width={16} height={16} alt='img' quality={100} className=' z-[1]' />
                                        </div>
                                    </Link>

                                    {/* Mute/Unmute Button */}
                                    <button onClick={handleMuteToggle} className={` z-[1] gap-8 p-2 rounded-full flix-footer-dark-fradient footer-border-dark flex items-center justify-center `} >
                                        <Image src={isMuted ? MuteIcon : UnmuteIcon} width={16} height={16} alt={isMuted ? "Muted" : "Unmuted"} />
                                    </button>

                                </div>

                            </div>

                            {/* <Image src={PayppyStoreLogo} width={290} height={36} alt='img' quality={100} className='absolute top-5 left-[50%] -translate-x-[50%] z-[1] ' /> */}

                        </section>


                        {/* this div is for make the filters sticky to this relative container  */}
                        <div className="relative">
                            {/* filter section  */}
                            <section className="py-4 px-5 small-border-x small-border-top  custom-border-grey800 flex justify-between items-cneter sticky top-0 left-0 z-[3] background-custom-grey50 " ref={filterRef}>
                                <div className="flex items-center gap-5">
                                    <StoreHomeCatagoryButtons catagory={'men'} selectedCatagory={selectedCatagory} handleProductCatagory={handleProductCatagory} />
                                    <StoreHomeCatagoryButtons catagory={'women'} selectedCatagory={selectedCatagory} handleProductCatagory={handleProductCatagory} />
                                    <StoreHomeCatagoryButtons catagory={'accessories'} selectedCatagory={selectedCatagory} handleProductCatagory={handleProductCatagory} />
                                </div>
                                <div className="flex items-center gap-4 ">
                                    <Image src={gridColums === 1 ? SingleViewActiveFilter : SingleViewFilter} width={16} height={14} quality={100} alt='img' className='cursor-pointer' onClick={handleSingleViewClick} />
                                    <Image src={gridColums === 2 ? MultiViewActiveFilter : MultiViewFilter} width={16} height={14} quality={100} alt='img' className='cursor-pointer' onClick={handleMultiViewClick} />
                                </div>
                            </section>


                            {/* grid view section  */}
                            <section className={`grid grid-cols-${gridColums} small-border-bottom small-border-x  custom-border-grey800`}>

                                {products?.length > 0 ?
                                    products?.map((element, index) => {
                                        return <ClothsImgInfoCompo key={index} borderClass={`  small-border-top ${index % 2 === 0 && gridColums === 2 ? ' small-border-right ' : ' '} `} data={element} accessToken={accessToken} getWishlistedProducts={fetchWishlistedProducts} wishlistedProducts={wishlistedProducts} />;
                                    })
                                    :
                                    Array(10).fill(null).map((element, index) => {
                                        return <StorePulseEffectComponent key={index} />;
                                    })

                                }

                            </section>
                            {products?.length < productsCount && <div className="flex justify-center items-center px-6 py-10 background-custom-grey50">
                                <button className="py-4 px-8 small-border border-black all-caps-12-bold custom-text-grey900" onClick={handleLoadMoreButtonClick} disabled={loadingAnimation}>{loadingAnimation ? <LoadingAnimation /> : 'Load More'}</button>
                            </div>}

                        </div>

                    </div>
                    <StoreFooter />
                    </div>
                </main>}
        </>
    );
}

export default StoreHomeSection;
