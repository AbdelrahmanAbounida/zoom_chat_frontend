import {
    createParser,
  } from 'eventsource-parser';
  import { OPENAI_API_HOST } from '../const/openai';
  
  export class ZoomOpenAIError extends Error {
    type;
    param;
    code;
  
    constructor(message, type, param, code) {
      super(message);
      this.name = 'ZoomOpenAIError';
      this.type = type;
      this.param = param;
      this.code = code;
    }
  }
  export const ZoomOpenAIStream = async (
    model,
    systemPrompt,
    key,
    messages,
  ) => {
    // update model
    model.id = "text-davinci-003"
    model.name = "text-davinci-003"

    let QA_PROMPT;
    let source_time;
    let transcript_id;

    const question = messages[messages.length-1];

    const formData = new FormData();
    formData.append('question', question['content']);

    await fetch(`https://zoom-chat-test.onrender.com`, {
                                        method: 'POST',
                                        body: formData,
                                    }) 
                          .then(response => response.json())
                          .then(data => {
                            const speaker = data["context"]["speaker_name"]
                            const context = data["context"]["text"]
                            source_time = data["context"]["time"]
                            transcript_id = data["context"]["transcript_id"]

                            QA_PROMPT = `You are a Q&A AI assistant. Use the following pieces of context got from zoom meeting transcript
                                          and reply to the following  question according to the given context
                                      
                                          question:
                                          ${question['content']}

                                          context:
                                          ${speaker} says:
                                      ${context}
                                      
                                      and if the context information is not enough to answer the question, politely say I don't know`

                          })

    const res = await fetch(`${OPENAI_API_HOST}/v1/completions`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key ? key : process.env.OPENAI_API_KEY}`,
        ...(process.env.OPENAI_ORGANIZATION && {
          'OpenAI-Organization': process.env.OPENAI_ORGANIZATION,
        }),
      },
      method: 'POST',
      body: JSON.stringify({
        model: model.id,
        prompt: QA_PROMPT, 
        max_tokens: 3000,
        temperature: 0,
        stream: true,
      }),
    });
  
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
  
    if (res.status !== 200) {
      const result = await res.json();
      if (result.error) {
        throw new ZoomOpenAIError(
          result.error.message,
          result.error.type,
          result.error.param,
          result.error.code,
        );
      } else {
        throw new Error(
          `OpenAI API returned an error: ${
            decoder.decode(result?.value) || result.statusText
          }`,
        );
      }
    }
  
    const stream = new ReadableStream({
      async start(controller) {
        const onParse = (event) => {
          if (event.type === 'event') {
            const data = event.data;
  
            if (data === '[DONE]') { // add time at the end
              const queue = encoder.encode(`(Time: ${source_time})`);
              controller.enqueue(queue);
              controller.close();
              return;
            }
  
            try {
              const json = JSON.parse(data);
              
              let text = json.choices[0].text;
              const queue = encoder.encode(text);
              controller.enqueue(queue);
            } catch (e) {
              controller.error(e);
            }
          }
        };
  
        const parser = createParser(onParse);
  
        for await (const chunk of res.body ) {
          console.log(decoder.decode(chunk))
          parser.feed(decoder.decode(chunk));
        }
      },
    });
  
    return stream;
  };
  