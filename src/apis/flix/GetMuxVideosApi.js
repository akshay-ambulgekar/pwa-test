import axios from "axios";

let baseUrl=process.env.STRAPI_ENDPOINT;

async function GetMuxVideosApi(page)
{
    try {
        let response=await axios.get(`${baseUrl}api/mux-video-uploader/mux-asset?populate=*&pagination[page]=${page}&pagination[pageSize]=3&sort=createdAt:desc`);

        return response.data;
    } catch (error) {
        console.error("Error fetching videos:", error);
        throw error; // Re-throw the error to handle it in the caller
    }
}

export default GetMuxVideosApi;



// import axios from "axios";


// async function GetMuxVideosApi() {
//     try {
//         let response = await axios.get(`https://strapi.payppy.app/api/mux-video-uploader/mux-asset?populate=*`);

//         return response.data;
//     } catch (error) {
//         console.log(error);

//     }
// }

// export default GetMuxVideosApi;