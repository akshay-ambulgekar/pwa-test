let baseurl=process.env.BACKEND_ENDPOINT;
function VerifyOtpApi(payloadObj,accessToken)
{
    return fetch(`${baseurl}api/verify_mobile_otp`,
        {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+accessToken
            },
            body:JSON.stringify(payloadObj),
        }
    )
    .then((data)=>{
        return data.json();
    })
    .catch((error)=>{
        return error;
    });
}

export default VerifyOtpApi;