'use client';

let baseurl=process.env.MEDUSA_ENDPOINT;
let publishKey=process.env.PUBLISHABLE_KEY;
function GetSingleStoreCollectionApi(collectionId)
{
       return fetch(`${baseurl}store/collections/${collectionId}`,{
            headers:{
                'x-publishable-api-key': publishKey,
                'Content-Type': 'application/json'
            },
            credentials:'include'
        })
        .then((data)=>{
            return data.json();
        })
        .then((response)=>{
            return response;
        })
        .catch((error)=>{
            console.error(error);
            return error;
        });
}

export default GetSingleStoreCollectionApi;