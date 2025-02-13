
let baseurl=process.env.MEDUSA_ENDPOINT;
function RemoveProductFromCartApi(cartId,lineId)
{
    return fetch(`${baseurl}store/carts/${cartId}/line-items/${lineId}
`,
        {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                "x-publishable-api-key": process.env.PUBLISHABLE_KEY,
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

export default RemoveProductFromCartApi;