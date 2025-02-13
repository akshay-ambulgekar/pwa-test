
let baseurl=process.env.BACKEND_ENDPOINT;
function DeleteCartIdApi(accessToken)
{
    return fetch(`${baseurl}auth/delete-cartid
`,
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearen '+accessToken
            },
            body:JSON.stringify({
                "order":true
            })
        }
    )
    .then((data)=>{
        return data.json();
    })
    .catch((error)=>{
        return error;
    });
}

export default DeleteCartIdApi;