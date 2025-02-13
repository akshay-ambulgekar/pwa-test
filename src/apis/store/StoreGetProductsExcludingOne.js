'use client';
let baseurl=process.env.MEDUSA_ENDPOINT;

function StoreGetProductsExcludingOne(query,productId)
{

    return fetch(`${baseurl}store/products${query}`,{
            headers:{
                "x-publishable-api-key": process.env.PUBLISHABLE_KEY
            }
        })
        .then((data)=>{
            return data.json();
        })
        .then((response)=>{
            let products=response.products.filter((element)=>{
                return element.id!==productId;
            });

            return products;
        })
        .catch((error)=>{
            console.error(error);
            return error;
        });


}

export default StoreGetProductsExcludingOne;