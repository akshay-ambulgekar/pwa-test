
let baseurl=process.env.BACKEND_ENDPOINT;
function UserResendMail(payload)
{
    return fetch(`${baseurl}auth/resend_verification_email`,
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
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

export default UserResendMail;