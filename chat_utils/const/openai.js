  export const OpenAIModelID = {
    GPT_3_5 : 'gpt-3.5-turbo',
    GPT_4 : 'gpt-4',
    TEXT_DAVINCI:"text-davinci-003",
  }
  
  export const fallbackModelID = OpenAIModelID.TEXT_DAVINCI;
  
  export const OpenAIModels = {
    [OpenAIModelID.GPT_3_5]: {
      id: OpenAIModelID.GPT_3_5,
      name: 'GPT-3.5',
      maxLength: 12000,
      tokenLimit: 4000,
    },
    [OpenAIModelID.GPT_4]: {
      id: OpenAIModelID.GPT_4,
      name: 'GPT-4',
      maxLength: 24000,
      tokenLimit: 8000,
    },
    [OpenAIModelID.TEXT_DAVINCI]: {
      id: OpenAIModelID.TEXT_DAVINCI,
      name: 'text-davinci-003',
      maxLength: 24000,
      tokenLimit: 4000,
    },
  };
  
  export const DEFAULT_SYSTEM_PROMPT = 
  process.env.DEFAULT_SYSTEM_PROMPT || `You are a Q&A AI assistant. Use the following pieces of context got from zoom meeting transcript
  and reply to the following  question according to the given context`;
  
  export const OPENAI_API_HOST = 
  process.env.OPENAI_API_HOST || 'https://api.openai.com';
  
  
  export const DEFAULT_TRANSCRIPT_ID = process.env.NEXT_PUBLIC_TRANSCRIPT_ID || `1T1g8KNFkxzxhDgsxUjlYl2ow2YQoUc82`
  export const DEFAULT_CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || `12345`
