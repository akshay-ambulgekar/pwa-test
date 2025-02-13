'use client';
let baseurl=process.env.MEDUSA_ENDPOINT;

function StoreProductsListApi(query)
{

    return fetch(`${baseurl}store/products${query}`,{
            headers:{
                "x-publishable-api-key": process.env.PUBLISHABLE_KEY
            }
        })
        .then((data)=>{
            return data.json();
        })
        .catch((error)=>{
            console.error(error);
            return error;
        });


}

export default StoreProductsListApi;