let baseUrl=process.env.BACKEND_ENDPOINT;
function FlixBlogFetchLikeAndSave(accessToken) {

    return fetch(`${baseUrl}api/user/interaction`, {
        method: 'GET',

        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'content-type': 'application/json'
        },
        'credentials':'include'

    })
        .then((response) => {
            // console.log(response,"response from api");
            return response.json();
        })
        .catch((error) => {
            return error;
        });
}


export default FlixBlogFetchLikeAndSave;



//fetch saved and liked blogs
//API --> http://nexus.payppy.app/api/user/interaction
// get method required and send access token



//import axios from "axios";

// async function FlixBlogFetchLikeAndSave(accessToken)
// {
//     try {
//         // let response = await axios.get(`https://nexus.payppy.app/api/user/interaction`);
//         let response = await fetch(`https://nexus.payppy.app/api/user/interaction`);
        

//         return response.data;
//     } catch (error) {
//         console.log(error);
        
//     }
// }

// export default FlixBlogFetchLikeAndSave;