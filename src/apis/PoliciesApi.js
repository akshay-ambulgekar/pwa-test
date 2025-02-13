import axios from "axios";


async function PoliciesApi(title)
{
    try {
        let response=await axios.get(`https://strapi.payppy.app/api/policies?populate=*`);


        let titleMatchedPolicy=response.data?.data.find((element)=>{
            return element.policy_title===title;
        });
        
        return titleMatchedPolicy;

    } catch (error) {
        console.error(error);
        
    }
}

export default PoliciesApi;