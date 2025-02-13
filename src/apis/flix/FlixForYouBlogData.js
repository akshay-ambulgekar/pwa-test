import axios from "axios";

let baseUrl=process.env.STRAPI_ENDPOINT;

async function FlixForYouBlogData(id)
{
    try {
        let response=await axios.get(`${baseUrl}api/flixes/${id}?populate=*`);

        return response.data;
    } catch (error) {
        console.error(error);
        
    }
}

export default FlixForYouBlogData;