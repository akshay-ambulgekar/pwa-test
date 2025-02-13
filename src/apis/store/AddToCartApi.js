
let baseurl=process.env.MEDUSA_ENDPOINT;
function AddToCartApi(payload,cartId)
{
    return fetch(`${baseurl}store/carts/${cartId}/line-items
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

export default AddToCartApi;