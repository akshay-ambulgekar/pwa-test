
let baseurl=process.env.BACKEND_ENDPOINT;
function AddCartInDatabaseApi(payload,accessToken)
{
    return fetch(`${baseurl}auth/add-cartid`,
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+accessToken,
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

export default AddCartInDatabaseApi;