import { throttle } from '@/chat_utils';
import { IconArrowDown, IconClearAll, IconSettings } from '@tabler/icons-react';
import { useTranslation } from 'next-i18next';
import {
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Spinner } from '../Global/Spinner';
import { ChatInput } from './ChatInput';
import { ChatLoader } from './ChatLoader';
import { ChatMessage } from './ChatMessage';

import {
  DEFAULT_CLIENT_ID,
  DEFAULT_TRANSCRIPT_ID
} from '@/chat_utils/const/openai';
import { saveConversation } from '@/chat_utils/app/conversation';


export const Chat = memo(
  ({
    conversation,
    models,
    apiKey,
    serverSideApiKeyIsSet,
    defaultModelId,
    messageIsStreaming,
    modelError,
    loading,
    prompts,
    onSend,
    onUpdateConversation,
    onEditMessage,
    stopConversationRef,
  }) => {
    const { t } = useTranslation('chat');
    const [currentMessage, setCurrentMessage] = useState();
    const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
    const [showScrollDownButton, setShowScrollDownButton] = useState(false);

    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const textareaRef = useRef(null);


    const [userInfo, setuserInfo] = useState({clientId:DEFAULT_CLIENT_ID, transcriptId: DEFAULT_TRANSCRIPT_ID})
    const [userInfoSubmitted, setuserInfoSubmitted] = useState(false)

   const handleUserInfoSubmit = (e) => {

    e.preventDefault()
    if(!userInfo.clientId){
      userInfo.clientId = DEFAULT_CLIENT_ID
    }
    if(!userInfo.transcriptId){
      userInfo.transcriptId = DEFAULT_TRANSCRIPT_ID

    }
    conversation.clientId = userInfo.clientId
    conversation.transcriptId = userInfo.transcriptId
    setuserInfoSubmitted(!userInfoSubmitted);
    saveConversation(conversation);
   }

    const handleScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          chatContainerRef.current;
        const bottomTolerance = 30;

        if (scrollTop + clientHeight < scrollHeight - bottomTolerance) {
          setAutoScrollEnabled(false);
          setShowScrollDownButton(true);
        } else {
          setAutoScrollEnabled(true);
          setShowScrollDownButton(false);
        }
      }
    };

    const handleScrollDown = () => {
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    };

    const scrollDown = () => {
      if (autoScrollEnabled) {
        messagesEndRef.current?.scrollIntoView(true);
      }
    };
    const throttledScrollDown = throttle(scrollDown, 250);

    useEffect(() => {
      throttledScrollDown();
      setCurrentMessage(
        conversation.messages[conversation.messages.length - 2],
      );
    }, [conversation.messages, throttledScrollDown]);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setAutoScrollEnabled(entry.isIntersecting);
          if (entry.isIntersecting) {
            textareaRef.current?.focus();
          }
        },
        {
          root: null,
          threshold: 0.5,
        },
      );
      const messagesEndElement = messagesEndRef.current;
      if (messagesEndElement) {
        observer.observe(messagesEndElement);
      }
      return () => {
        if (messagesEndElement) {
          observer.unobserve(messagesEndElement);
        }
      };
    }, [messagesEndRef]);

    useEffect(()=>{
      console.log(userInfoSubmitted)
    },[userInfoSubmitted])

    return (
      <div className="relative flex-1 overflow-hidden bg-white dark:bg-[#343541]">
        {
        (
          <>
            <div
              className="max-h-full overflow-x-hidden"
              ref={chatContainerRef}
              onScroll={handleScroll}
            >
              {conversation.messages.length === 0 && !conversation.clientId ? (
                <>
                  <div className="mx-auto flex w-[350px] flex-col space-y-10 pt-12 sm:w-[600px]">
                    <div className="text-center text-3xl font-semibold text-gray-800 dark:text-gray-100">
                      {(
              <form onSubmit={handleUserInfoSubmit} class="w-full max-w-2xl border border-gray-500 p-3 rounded-md justify-center">
                <div class="flex flex-wrap mx-3 mb-6">
                  <div class="w-full  px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-white-700 text-sm mb-3 mt-1" for="grid-clientId">
                      Transcript ID
                    </label>
                    <input 
                          value={userInfo.transcriptId}
                          class="block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-[1.2rem] font-normal mb-5" 
                          id="grid-transcriptId" 
                          type="text" 
                          placeholder="1T1g8KNFkxzxhDgsxUjlYl2ow2YQoUc82"
                          onChange={
                            (e) => {
                              setuserInfo({clientId:userInfo.clientId, transcriptId: e.target.value})
                            }
                          }
                          /> 
                  </div>
                  <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-white-700 text-sm  mb-2" for="grid-transcriptId">
                      Client ID
                    </label>
                    <input 
                      value={userInfo.clientId}
                      class=" block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-[1.2rem] font-normal" 
                      id="grid-last-name" 
                      type="text" 
                      placeholder="12345" 
                      onChange={(e)=>{
                        setuserInfo({clientId: e.target.value,transcriptId:userInfo.transcriptId})
                      }}
                      />
                  </div>

                  <div class="w-full px-3">

                    <button 
                    type="submit"
                    class="mt-7 shadow bg-indigo-500 hover:bg-indigo-600 focus:shadow-outline focus:outline-none text-white py-2 px-8 rounded text-lg" 
                    >
                      Submit
                    </button>
                  </div>

                  <div class="w-full  px-3">
                  <div class="md:w-1/3"></div>
                  <div class="md:w-2/3">
                  
                  </div>
                </div>

                  
                </div>
                
                </form>
                      )}
                    </div>

                  </div>
                </>
              ) : (

                conversation.messages.length === 0 ? <div className="flex justify-center  border-b-neutral-300  py-2 mt-7 text-xl ">I am ready to asnwer your questions 😀 </div> :
                <>
                  <div className="flex justify-center  border-b-neutral-300  py-2 ">
                  </div>
                  {conversation.messages.map((message, index) => (
                    <ChatMessage
                      key={index}
                      message={message}
                      messageIndex={index}
                      onEditMessage={onEditMessage}
                    />
                  ))}

                  {loading && <ChatLoader />}

                  <div
                    className="h-[162px] bg-white dark:bg-[#343541]"
                    ref={messagesEndRef}
                  />
                </>
              )}
            </div>

            <ChatInput
              stopConversationRef={stopConversationRef}
              textareaRef={textareaRef}
              messageIsStreaming={messageIsStreaming}
              conversationIsEmpty={conversation.messages.length === 0}
              model={conversation.model}
              prompts={prompts}

              onSend={(message, plugin) => {
                setCurrentMessage(message);
                onSend(message, 0, plugin);
              }}

              onRegenerate={() => {
                if (currentMessage) {
                  onSend(currentMessage, 2, null);
                }
              }}

            />
          </>
        )}
        
        {showScrollDownButton && (
          <div className="absolute bottom-0 right-0 mb-4 mr-4 pb-20">
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-300 text-gray-800 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-neutral-200"
              onClick={handleScrollDown}
            >
              <IconArrowDown size={18} />
            </button>
          </div>
        )}
      </div>
    );
  },
);
Chat.displayName = 'Chat';