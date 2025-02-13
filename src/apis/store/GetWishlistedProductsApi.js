let baseurl=process.env.BACKEND_ENDPOINT;
function GetWishlistedProductsApi(accessToken)
{
    return fetch(`${baseurl}api/user/wishlist
`,
        {
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearen '+accessToken
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

export default GetWishlistedProductsApi;