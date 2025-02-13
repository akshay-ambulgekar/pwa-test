let baseurl=process.env.BACKEND_ENDPOINT;
function GetUserFollowedBrandApi(accessToken)
{
    return fetch(`${baseurl}api/user/brand-follows`,
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

export default GetUserFollowedBrandApi;