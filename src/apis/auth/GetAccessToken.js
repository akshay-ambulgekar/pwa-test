let baseurl=process.env.BACKEND_ENDPOINT;
function GetAccessTokenAPI()
{
    return fetch(`${baseurl}auth/refresh-token`,
        {
            headers:{
                'Content-Type':'application/json',
            },
            credentials:'include',
        }
    )
    .then((data)=>{
        return data.json();
    })
    .catch((error)=>{
        return error;
    });
}

export default GetAccessTokenAPI;