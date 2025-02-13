import axios from "axios";

let baseUrl=process.env.STRAPI_ENDPOINT;

async function FlixCatagoriesApi()
{
    try {
        // let response=await axios.get('http://148.135.138.27:1337/api/flix-catagories/?populate=*');
        let response=await axios.get(`${baseUrl}api/flix-catagories/?populate=*`);

        return response.data;
    } catch (error) {
        console.error(error);
        
    }
}

export default FlixCatagoriesApi;