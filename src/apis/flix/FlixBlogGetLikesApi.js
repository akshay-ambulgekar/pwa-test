import axios from "axios";
let baseUrl=process.env.BACKEND_ENDPOINT;

async function FlixBlogGetLikesApi({contentId})
{
    try {
        let response = await axios.get(`${baseUrl}api/content/${contentId}/likes`);

        return response.data;
    } catch (error) {
        console.error(error);
        
    }
}

export default FlixBlogGetLikesApi;




//get likes
//API 
//"https://strapi.payppy.app/api/content/<content_id>/likes" get method no playload




//user likes get method
//access token
//API
//"https://strapi.payppy.app/api/user/likes"