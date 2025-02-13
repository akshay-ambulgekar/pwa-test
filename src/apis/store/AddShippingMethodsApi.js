
let baseurl=process.env.MEDUSA_ENDPOINT;
function AddShippingMethodsApi(payload,cartId)       //cart Id if we want to add a data for that cart then  
{
    return fetch(`${baseurl}store/carts/${cartId}/shipping-methods
`,
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                "x-publishable-api-key": process.env.PUBLISHABLE_KEY
            },
            body:JSON.stringify(payload)
        }
    )
    .then((data)=>{
        return data.json();
    })
    .catch((error)=>{
        return error;
    });
}

export default AddShippingMethodsApi;