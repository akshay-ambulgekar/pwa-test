import axios from "axios";

let baseUrl=process.env.STRAPI_ENDPOINT;

async function FlixForYouApi(page)
{
    try {
        let response = await axios.get(`${baseUrl}api/flixes/?populate=*&pagination[page]=${page}&pagination[pageSize]=3&sort=updatedAt:desc`);
        // let response = await axios.get(`${baseUrl}api/flixes/?populate=*`);

        return response.data;
    } catch (error) {
        console.error(error);
        
    }
}

export default FlixForYouApi;


//Original code
// import axios from "axios";

// async function FlixForYouApi()
// {
//     try {
//         let response = await axios.get('https://strapi.payppy.app/api/flixes/?populate=*');

//         return response.data;
//     } catch (error) {
//         console.log(error);
        
//     }
// }

// export default FlixForYouApi;


  