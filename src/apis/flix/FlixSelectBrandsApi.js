import axios from "axios";

let baseUrl=process.env.STRAPI_ENDPOINT;

async function FlixSelectBrandsApi(collectionId)
{
    try {
        let response=await axios.get(`${baseUrl}/api/store-brands?populate=*`);

        let result= response.data.data;

        let collectionInfo =result.filter((element)=>{
            return element.collection_id===collectionId;
        });

        
        return collectionInfo[0];

    } catch (error) {
        console.error(error);
        
    }
}

export default FlixSelectBrandsApi;