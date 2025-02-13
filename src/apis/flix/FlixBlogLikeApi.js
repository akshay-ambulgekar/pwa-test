let baseUrl=process.env.BACKEND_ENDPOINT;
function FlixBlogLikeApi(payload,accessToken) {
    
    return fetch(`${baseUrl}api/like`,{
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


export default FlixBlogLikeApi;




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



//fetch saved and liked blogs
//API --> http://nexus.payppy.app/api/user/interaction
// get method required and send access token

