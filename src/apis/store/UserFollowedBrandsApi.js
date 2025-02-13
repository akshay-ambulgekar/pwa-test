let baseurl=process.env.BACKEND_ENDPOINT;
function UserFollowedBrandsApi(payload,accessToken)
{
    return fetch(`${baseurl}api/follow`,
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+accessToken
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

export default UserFollowedBrandsApi;