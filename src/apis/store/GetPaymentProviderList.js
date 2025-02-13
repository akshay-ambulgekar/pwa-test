
let baseurl=process.env.MEDUSA_ENDPOINT;
let region_id='reg_01JDPJAQ0EV727HP0MPZH1NZA9';
function GetPaymentProviderList()
{
    return fetch(`${baseurl}store/payment-providers?region_id=${region_id} 
`,
        {
            headers:{
                'Content-Type':'application/json',
                "x-publishable-api-key": process.env.PUBLISHABLE_KEY
            },
        }
    )
    .then((data)=>{
        return data.json();
    })
    .catch((error)=>{
        return error;
    });
}

export default GetPaymentProviderList;