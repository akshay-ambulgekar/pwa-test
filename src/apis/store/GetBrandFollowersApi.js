let baseurl=process.env.BACKEND_ENDPOINT;
function GetBrandFollowersApi(accessToken,brandId)
{
    return fetch(`${baseurl}api/brands/${brandId}/follow`,
        {
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+accessToken
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

export default GetBrandFollowersApi;