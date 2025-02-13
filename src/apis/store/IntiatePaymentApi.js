
let baseurl=process.env.MEDUSA_ENDPOINT;
function IntiatePaymentApi(payload,paymentCollectionId)
{
    return fetch(`${baseurl}store/payment-collections/${paymentCollectionId}/payment-sessions
`,
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                "x-publishable-api-key": process.env.PUBLISHABLE_KEY
            },
            body:JSON.stringify(payload)
        }
    )
    .then((data)=>{
        return data.json();
    })
    .catch((error)=>{
        return error;
    });
}

export default IntiatePaymentApi;