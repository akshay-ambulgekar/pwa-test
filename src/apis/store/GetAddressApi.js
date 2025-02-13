
let baseurl=process.env.BACKEND_ENDPOINT;
function GetAddressApi(accessToken)
{
    return fetch(`${baseurl}api/get-addresses`,
        {
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+accessToken,
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

export default GetAddressApi;