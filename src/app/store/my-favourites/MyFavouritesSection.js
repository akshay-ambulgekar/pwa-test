'use client';
import StoreShopPepoinNavbar from '@/Components/StoreShopPepoinNavbar';


import { useCallback, useEffect, useState } from 'react';
import GetCartInfoApi from '@/apis/store/GetCartInfoApi';
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import IntialLoadingAnimation from '@/Components/InitialPageLoadingAnimation';
import GetCartItemsApi from '@/apis/store/GetCartItemsApi';
import ShppingBagMyFavouritesButtons from '@/Components/ShppingBagMyFavouritesButtons';
import GetWishlistedProductsApi from '@/apis/store/GetWishlistedProductsApi';
import MyFavouritesClothComponent from '@/Components/MyFavouritesClothComponent';
import CartEmptyViewComponent from '@/Components/CartEmptyViewComponent';


function MyFavouritesSection() {

    let[accessToken,setAccessToken]=useState('');
    let[gettingAccessToken,setGettingAccessToken]=useState(true);

    let[cartid,setCartId]=useState('');
    let[cartItems,setCartItems]=useState([]);

    let[wishlistedProducts,setwishlistedProducts]=useState([]);



     //to get a access token
     useEffect(()=>{
        getAccessToken();
    },[]);

    useEffect(()=>{
        if(accessToken)
        {
            getCartInfo();
            fetchWishlistedProducts();
        }
    },[accessToken]);

    useEffect(()=>{
        if(cartid)
        {
            getCartItems();
        }
    },[cartid]);

      //getting access token
      function getAccessToken()
      {
          GetAccessTokenAPI()
          .then((response)=>{
              if(response&&'message' in response&&response.message==='Refresh token is missing!')
              {
                  window.location.href='/auth/user-auth';
              }
              if(response&&'access_token' in response)
              {
                  setAccessToken(response.access_token);
              }
              
          })
          .catch(()=>{
          })
          .finally(()=>{
             setGettingAccessToken(false);
          });
          
      }
 
     //get cart information from api
     const getCartInfo = useCallback(() => {
        GetCartInfoApi(accessToken)
            .then((response) => {
                if (response && 'cart_id' in response) {
                    setCartId(response.cart_id);
                }
            })
            .catch((error) => {
                console.error("Error fetching cart information:", error);
            });
    }, [accessToken, cartid]);

     //get cart items
     const getCartItems = useCallback(() => {
        GetCartItemsApi(cartid)
            .then((response) => {
                if (response && response.cart) {
                    setCartItems(response.cart);
                }
            })
            .catch((error) => {
                console.error("Error fetching cart items:", error);
            });
    }, [cartid,cartItems]);


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
    
    
    return (
        <>
            {gettingAccessToken || !accessToken ? <IntialLoadingAnimation />
                : <section className={"flex justify-center min-h-dvh w-full background-custom-grey50    " }>
                    <div className="page-center-parent-container !h-auto small-border custom-border-grey600 overflow-y-scroll overflow-scrollbar-hidden flex flex-col justify-between relative">
                        <div>

                            <StoreShopPepoinNavbar pepcoin={true} backclickurl='/store/home' isItemsPresentInCart={cartItems?.items?.length > 0} accessToken={accessToken} store={true} />

                            <ShppingBagMyFavouritesButtons shoppingBagCount={(cartItems?.items?.length || 0)}/>

                        <div className="grid grid-cols-2  gap-y-4 custom-border-grey800 ">
                            {wishlistedProducts?.length>0&&wishlistedProducts?.map((element,index)=>{
                                return <MyFavouritesClothComponent key={index} borderClass={`   small-border-right `} myFavouriteView={true} addToCartButton={true} myFavouriteViewData={element} getWishlistedProducts={fetchWishlistedProducts} accessToken={accessToken}/>;
                            })

                            }
                            
                        </div>

                        {accessToken&&wishlistedProducts?.length===0&&<div className="flex justify-center items-center  h-[90dvh] w-full border">
                                <CartEmptyViewComponent title={'hmmm.. no Favourites?'} />
                            </div>}


                        </div>


                       

                    </div>
                </section>}
        </>
    );
}

export default MyFavouritesSection;

