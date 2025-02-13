let baseUrl=process.env.BACKEND_ENDPOINT;

function FlixBlogSaveApi(payload,accessToken) {
    
       return fetch(`${baseUrl}api/save`,{
            method:'POST',
            
            headers:{
                'Authorization': 'Bearer '+accessToken,
                'content-type':'application/json'
            },
            body:JSON.stringify(payload)
        })
        .then((response)=>{
            return response.json();
        })
        .catch((error)=>{
            return error;
        });
    }


export default FlixBlogSaveApi;



//for save post method
//access token
//var content_id
//saved = true/ false



//for like post method

//payload
//access token
//var content_id
//liked = true/ false


//get likes
//API 
//"https://strapi.payppy.app/api/content/<content_id>/likes" get method no playload



//user likes get method
//access token
//API
//"https://strapi.payppy.app/api/user/likes"
