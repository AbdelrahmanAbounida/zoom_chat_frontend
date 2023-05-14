import {  createContext } from 'react';

export const HomeinitialState = {
    apiKey: '',
    loading: false,
    pluginKeys: [],
    lightMode: 'dark',
    messageIsStreaming: false,
    modelError: null,
    models: [],
    folders: [],
    conversations: [],
    selectedConversation: undefined,
    currentMessage: undefined,
    prompts: [],
    temperature: 1,
    showPromptbar: true,
    showChatbar: true,
    currentFolder: undefined,
    messageError: false,
    searchTerm: '',
    defaultModelId: undefined,
    serverSideApiKeyIsSet: false,
    serverSidePluginKeysSet: false,
  }
  

export const HomeContext = createContext( {
    state: HomeinitialState,
    handleNewConversation: () => {},
    handleCreateFolder: (name, type) => {},
    handleDeleteFolder: (folderId) => {},
    handleUpdateFolder: (folderId, name) => {},
    handleSelectConversation: (conversation) => {},
    handleUpdateConversation: (
      conversation,
      data,
    ) => {},
  });

  export const ChatbarInitialState = {
    searchTerm: '',
    filteredConversations: [],
  };

export const ChatbarContext = createContext({
    state: ChatbarInitialState,
  handleDeleteConversation: (conversation) => {},
  handleClearConversations: () => {},
  handleExportData: () => {},
  handleImportConversations: (data) => {},
  handlePluginKeyChange: (pluginKey) => {},
  handleClearPluginKey: (pluginKey) => {},
  handleApiKeyChange: (apiKey) => {},
});
