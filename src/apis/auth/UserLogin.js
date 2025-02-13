
let baseurl=process.env.BACKEND_ENDPOINT;
function UserLogin(payload)
{
    return fetch(`${baseurl}auth/login`,
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            credentials:'include',
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

export default UserLogin;