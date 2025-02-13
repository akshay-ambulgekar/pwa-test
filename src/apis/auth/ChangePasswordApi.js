let baseurl=process.env.BACKEND_ENDPOINT;
function ChangePasswordApi(payload,accessToken)
{
    return fetch(`${baseurl}auth/change_password`,
        {
            method:'PUT',
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

export default ChangePasswordApi;