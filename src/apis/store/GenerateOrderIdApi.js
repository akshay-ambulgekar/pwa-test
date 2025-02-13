
let baseurl=process.env.MEDUSA_ENDPOINT;
function GenerateOrderIdApi(cartId)
{
    return fetch(`${baseurl}store/carts/${cartId}/complete
`,
        {
            method:'POST',
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

export default GenerateOrderIdApi;