'use client';

import Image from 'next/image';



//filter section images
import SingleViewFilter from '@/Images/Store/single-view-filter.svg';
import SingleViewActiveFilter from '@/Images/Store/single-view-active-filter.svg';

import MultiViewFilter from '@/Images/Store/multi-view-filter.svg';
import MultiViewActiveFilter from '@/Images/Store/multi-view-active-filter.svg';
import { useCallback, useEffect, useState } from 'react';

//collections images
import { useSearchParams } from 'next/navigation';
import GetSingleStoreCollectionApi from '@/apis/store/GetSingleStoreCollectionApi';
import IntialLoadingAnimation from '@/Components/InitialPageLoadingAnimation';
import { useRouter } from 'next/navigation';
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import GetBrandFollowersApi from '@/apis/store/GetBrandFollowersApi';
import GetUserFollowedBrandApi from '@/apis/store/GetUserFollowedBrandApi';
import LoadingAnimation from '@/app/auth/LoadingAnimation';
import UserFollowedBrandsApi from '@/apis/store/UserFollowedBrandsApi';
import StoreShopPepoinNavbar from '@/Components/StoreShopPepoinNavbar';
import StoreProductsListApi from '@/apis/store/StoreProductsListApi';
import ClothsImgInfoCompo from '@/Components/ClothsImgInfoCompo';
import StorePulseEffectComponent from '@/Components/StorePulseEffectComponent';
import FlixSelectBrandsApi from '@/apis/flix/FlixSelectBrandsApi';
import GetWishlistedProductsApi from '@/apis/store/GetWishlistedProductsApi';

function BrandPageSection() {

    let [gridColums, setGridColumns] = useState(2);


    let[collectionId,setCollectionId]=useState('');
    let[loadingAnimation,setLoadingAnimation]=useState(false);
    let[collectionInfo,setCollectioninfo]=useState('');
    let[collectionProducts,setCollectionProducts]=useState([]);
    let[followedLinkClicked,setFollowLinkClicked]=useState(false);
    let[collectionStrapiInformation,setCollectionStrapiInformation]=useState('');

    let[accessToken,setAccessToken]=useState('');
    let[gettingAccessToken,setGettingAccessToken]=useState(true);

    let[brandFollowersInfo,setBrandFollowersInfo]=useState('');


    let[isUserFollowedBrand,setIsUserFollowedBrand]=useState(false);
    let[productsCount,setProductsCount]=useState(0);
    let[clickedLoadMoreCount,setClickedLoadMore]=useState(1);

    let[wishlistedProducts,setwishlistedProducts]=useState([]);


    let params=useSearchParams();
    let router=useRouter();


    useEffect(()=>{
        getAccessToken();
    },[]);

    useEffect(()=>{
        let paramsCollectionid=params.get('collection');
        if(paramsCollectionid)
        {
            setCollectionId(paramsCollectionid);
        }
    },[params]);

    useEffect(()=>{
        if(accessToken)
        {
            getBrandFollowers();
            UserFollowedBrands();
        }
    },[accessToken]);

    useEffect(()=>{
        if(collectionId)
        {
            getCollectionInformation();
            getCollectionImagesAndDescription();
            getCollectionProducts();
        }
    },[collectionId,clickedLoadMoreCount]);

   

    //get collection information
    let getCollectionInformation=useCallback(()=>
    {
        GetSingleStoreCollectionApi(collectionId)
            .then((response)=>{
                if(response&&'collection' in response)
                {
                    setCollectioninfo(response?.collection);
                }  
            })
            .catch((error)=>{
                console.error(error);
            })
            .finally(()=>{
                setLoadingAnimation(false);
            });
    },[]);

     //get collection images and description
     let getCollectionImagesAndDescription=useCallback(()=>
     {
         FlixSelectBrandsApi(collectionId)
             .then((response)=>{
                setCollectionStrapiInformation(response);
             })
             .catch((error)=>{
                 console.error(error);
             });
     },[]);
     let baseUrl = process.env.STRAPI_ENDPOINT;

     function getImgUrl(data) {
        const imgName = data?.banner_image?.formats?.large?.url || data?.banner_image?.formats?.medium?.url || data?.banner_image?.formats?.small?.url || data?.banner_image?.formats?.thumbnail.url;
        return (imgName ? (baseUrl + imgName) : "");
      }

    //if someone click on follow link
    let handleFollowClick=useCallback(()=>
    {
        if(!accessToken)
        {
            router.push('/auth/user-auth');
        }
        setFollowLinkClicked(true);

        let payloadObj={
            "Brand_id":collectionId,
            "followed":!isUserFollowedBrand
        };
        UserFollowedBrandsApi(payloadObj,accessToken)
        .then((response)=>{
            if(response)
            {
                if('message' in response && response?.message==='Follow status updated')
                {
                    setFollowLinkClicked(false);
                    getBrandFollowers();
                    UserFollowedBrands();
                }
            }
        })
        .catch((error)=>{
            console.error(error);
        })
        .finally(()=>{
            setFollowLinkClicked(false);
        });

    },[]);


    //get brand followers
    function getBrandFollowers()
    {
        GetBrandFollowersApi(accessToken,collectionId)
        .then((response)=>{
            if(response&&'follow_count' in response)
            {
                setBrandFollowersInfo(response.follow_count);
            }
            
        })
        .catch((error)=>{
            console.error(error);
        });
    }

    //user followed brand list
    function UserFollowedBrands()
    {
        GetUserFollowedBrandApi(accessToken)
        .then((response)=>{
            if(response&&'followed_brands' in response)
            {
                if(response?.followed_brands?.length===0)
                {
                    setIsUserFollowedBrand(false);
                    return;
                }
                response?.followed_brands?.forEach((element)=>{
                    if(element.Brand_id===collectionId)
                    {
                        setIsUserFollowedBrand(true);
                    }
                    else{
                        setIsUserFollowedBrand(false);
                    }
                });
            }
        })
        .catch((error)=>{
            console.error(error);
            
        });
    }

    //get collection products
    function getCollectionProducts()
    {
        let limit = clickedLoadMoreCount*50;

        let query = `?limit=${limit}&region_id=reg_01JDPJAQ0EV727HP0MPZH1NZA9&fields=*variants.calculated_price&collection_id=${collectionId}`;

        StoreProductsListApi(query)
        .then((response)=>{
            if(response)
            {
                setCollectionProducts(response?.products);
                setProductsCount(response?.count);
                
            }
        })
        .catch((error)=>{
            console.error(error);
        });
    }


    //handle load more button click
    let handleLoadMoreButtonClick=useCallback(()=>{
        let totalcount=collectionProducts.length<productsCount;
        
        if(totalcount)
        {
            let totalClickedTime=clickedLoadMoreCount+1;
            
            setClickedLoadMore(totalClickedTime);
        }
    },[]);

    let fetchWishlistedProducts=useCallback(()=>
    {
        GetWishlistedProductsApi(accessToken)
        .then((response)=>{
            if(response){
                if('wishlist' in response)
                {
                    setwishlistedProducts(response?.wishlist);
                }
            }
        })
        .catch((error)=>{
            console.error(error);
        });
    },[]);


      //getting access token
      function getAccessToken()
      {
          GetAccessTokenAPI()
          .then((response)=>{
              if(response&&'access_token' in response)
              {
                  setAccessToken(response.access_token);
              }
              
          })
          .catch(()=>{
  
          })
          .finally();
          {
              setGettingAccessToken(false);
          }
      }

       // Memoized handlers
  const handleSingleViewClick = useCallback(() => {
    setGridColumns(1);
  }, []);

  const handleMultiViewClick = useCallback(() => {
    setGridColumns(2);
  }, []);
    return (
        <>
          { loadingAnimation || gettingAccessToken?<IntialLoadingAnimation/>
          : <section className={"flex justify-center  w-full background-custom-grey50    " }>
                <div className="page-center-parent-container   overflow-scrollbar-hidden ">
                    <div className="small-border border-black relative">
                        <StoreShopPepoinNavbar share={true} routerBackClick={true}/>
                        {/* brand header details  */}
                        <div className="pb-24 flex flex-col items-center background-custom-white small-border-bottom custom-border-grey800 ">
                            <div className="overflow-hidden h-[219px] w-full">
                                <Image src={getImgUrl(collectionStrapiInformation)} width={400} height={219} quality={100} alt='img' className='w-full h-auto object-cover' />
                            </div>
                            <div className="inline-flex flex-col gap-5 items-center -m-12">
                                <div className="rounded-full w-24 h-24 background-custom-white small-border custom-border-grey800 flex justify-center items-center p-2">
                                    <Image src={baseUrl+(collectionStrapiInformation?.brand_logo?.url)} width={60} height={40} quality={100} alt='img' className='w-auto h-auto object-cover' />
                                </div>
                                <div className="flex flex-col gap-2 items-center">
                                    <div className="all-caps-14-bold custom-text-grey900">{collectionInfo?.title}</div>
                                    <div className="flex items-center gap-2">
                                        <div className="all-caps-10 custom-text-grey600">{brandFollowersInfo || 0} Followers</div>
                                        {/* <div className="w-0.5 h-0.5 rounded-full background-custom-grey900"></div> */}
                                        {/* <div className="all-caps-10 custom-text-grey600">Joined 2023</div> */}
                                    </div>
                                </div>
                                <div className="">
                                    <button className={`text-center all-caps-12-bold min-w-[170px] flex justify-center px-5 py-4 ${isUserFollowedBrand?' small-border border-black text-black ':'  bg-black custom-text-white '}`} disabled={followedLinkClicked} onClick={handleFollowClick}>{followedLinkClicked?<LoadingAnimation borderColor='border-white'/>:isUserFollowedBrand?'Unfollow':'Follow'}</button>
                                </div>
                            </div>
                        </div>

                        {/* About section  */}
                        <section className="py-8 px-4 background-custom-white flex flex-col gap-3 small-border-bottom custom-border-grey800 ">
                            <div className="all-caps-12-bold custom-text-grey900">About</div>
                            <div className="flex flex-col gap-1">
                                <p className="">
                                    <span className="custom-text-grey800  body-sm">{collectionStrapiInformation?.about_us_description || ""} </span>
                                    {/* {readmoreContent && <span className={`custom-text-grey800  body-sm  `}>a collaboration story between two British heritage luxury brands. The collection encapsulates the best of contemporary and heritage styling, a collaboration story between two British heritage luxury brands. The collection encapsulates the best of contemporary and heritage styling, </span>} */}
                                </p>
                                {/* <div >
                                    <span className="custom-text-grey600  custom-border-grey600 body-sm cursor-pointer " onClick={() => { setReadMoreContent(!readmoreContent) }}>{readmoreContent ? 'show less' : 'read more'}</span>
                                </div> */}
                            </div>
                        </section>

                        {/* Collections section  */}
                        {/* <section className="py-8 px-4 background-custom-white flex flex-col gap-3 ">
                            <div className="body-bold custom-text-grey900">Collections</div>
                            <div className="flex w-full ">
                                <div className="flex flex-col gap-3 grow">
                                    <Image src={StoreImg3} width={183} height={274} quality={100} alt='img' className='w-full' />
                                    <div className="all-caps-10 custom-text-grey900">CyberPUNK</div>
                                </div>
                                <div className="flex flex-col gap-3 grow">
                                    <Image src={StoreImg2} width={183} height={274} quality={100} alt='img' className='w-full' />
                                    <div className="all-caps-10 custom-text-grey900">MAGMA</div>
                                </div>
                            </div>
                        </section> */}


                        {/* filter section  */}
                        <div className="p-4    custom-border-grey800 flex justify-end gap-4 items-cneter  background-custom-white">
                            <Image src={gridColums === 1 ? SingleViewActiveFilter : SingleViewFilter} width={16} height={14} quality={100} alt='img' className='cursor-pointer' onClick={handleSingleViewClick} />
                            <Image src={gridColums === 2 ? MultiViewActiveFilter : MultiViewFilter} width={16} height={14} quality={100} alt='img' className='cursor-pointer' onClick={handleMultiViewClick} />
                        </div>


                        {/* grid view section  */}
                        <section className={`grid grid-cols-${gridColums} small-border-bottom `}>
                        {collectionProducts?.length > 0 ?
                                collectionProducts?.map((element, index) => {
                                    return <ClothsImgInfoCompo key={index} borderClass={`  small-border-top ${index % 2 === 0 && gridColums === 2 ? ' small-border-right ' : ' '} `} data={element} accessToken={accessToken} getWishlistedProducts={fetchWishlistedProducts} wishlistedProducts={wishlistedProducts}/>;
                                })
                                :
                                Array(10).fill(null).map((element,index)=>{
                                    return <StorePulseEffectComponent key={index}/>;
                                })

                            }

                        </section>
                        {collectionProducts?.length<productsCount&& <div className="flex justify-center items-center px-6 py-10 background-custom-grey50">
                            <button className="py-4 px-8 small-border border-black all-caps-12-bold custom-text-grey900" onClick={handleLoadMoreButtonClick} disabled={loadingAnimation}>{loadingAnimation?<LoadingAnimation/>:'Load More'}</button>
                        </div>}


                    </div>

                </div>
            </section>}
        </>
    );
}

export default BrandPageSection;

