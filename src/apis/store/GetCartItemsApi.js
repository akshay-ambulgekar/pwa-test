
let baseurl=process.env.MEDUSA_ENDPOINT;
function GetCartItemsApi(cartId)
{
    return fetch(`${baseurl}store/carts/${cartId}
`,
        {
            headers:{
                'Content-Type':'application/json',
                "x-publishable-api-key": process.env.PUBLISHABLE_KEY
            },
        }
    )
    .then((data)=>{
        return data.json();
    })
    .catch((error)=>{
        return error;
    });
}

export default GetCartItemsApi;