'use client';

let baseurl=process.env.MEDUSA_ENDPOINT;

function TaxesApi(cartId)
{

    return fetch(`${baseurl}store/carts/${cartId}/taxes`,{
        method:'POST',
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

export default TaxesApi;