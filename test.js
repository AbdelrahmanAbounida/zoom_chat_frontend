const test = async () => {
    const payload =  {
        "question": "Hi",
        "clientId": "12345",
        "transcript_ids":"1T1g8KNFkxzxhDgsxUjlYl2ow2YQoUc82",
        }
    
    console.log(JSON.stringify(payload))
    console.log("******************************************")
    
      await fetch(`https://zoom-pinecone-backend.onrender.com/qa`, {
                    headers: {
                      "Content-Type": "application/json",
                    },
                    method: 'POST',
                    body: JSON.stringify(payload),
                }) 
                .then(response =>response.json())
                .then(data => {
                  console.log(data["result"])
                })
}

test()