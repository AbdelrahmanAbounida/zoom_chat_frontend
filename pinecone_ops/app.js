import { PineconeClient } from "@pinecone-database/pinecone";

const pinecone = new PineconeClient();

export const init_pinecone = async() => {
    console.log(process.env.NEXT_PUBLIC_PINECONE_ENVIRONMENT)
    console.log(process.env.NEXT_PUBLIC_PINECONE_API_KEY)
    console.log("##################################")
    await pinecone.init({
                    environment: process.env.NEXT_PUBLIC_PINECONE_ENVIRONMENT,
                    apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY,
                    })

};

export const Pinecone_QA_Request = async (question,clientID,transcriptIDs) => {
    
    const index_name = process.env.NEXT_PUBLIC_INDEX_NAME || "dailyautomations"
    const index = pinecone.Index(index_name);

    metadata = {
        "transcript_id": {
            "$in": transcriptIDs
        },
        "clientID": {
            "$eq": clientID
        }
    }

    const payload = {
        model: 'text-embedding-ada-002',
        input: question,
        temperature: 0.5,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 2000,
      }

    const embedded_question = await fetch("https://api.openai.com/v1/chat/embeddings",{
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
                                    },
                                    method: "POST",
                                    body: JSON.stringify(payload),
                                })
    const queryRequest = {
    vector: embedded_question,
    topK: 1,
    includeValues: true,
    includeMetadata: true,
    filter: metadata,
    namespace: process.env.NEXT_PUBLIC_NAME_SPACE || "dailyautomations",
    };
    const queryResponse = await index.query({ queryRequest });

    return queryResponse
}