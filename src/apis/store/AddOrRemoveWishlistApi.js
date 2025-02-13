let baseurl=process.env.BACKEND_ENDPOINT;
function AddOrRemoveWishlistApi(payload,accessToken)
{
    return fetch(`${baseurl}api/add-to-wishlist
`,
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearen '+accessToken
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

export default AddOrRemoveWishlistApi;