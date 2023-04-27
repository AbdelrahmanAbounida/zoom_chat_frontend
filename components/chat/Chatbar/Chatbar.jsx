import { IconFolderPlus, IconMessagesOff, IconPlus } from '@tabler/icons-react';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { ChatFolders } from '../Folders/ChatFolders';
import { Search } from '../Sidebar/Search';
import { ChatbarSettings } from './ChatbarSettings';
import { Conversations } from './Conversations';
import FileUploadArea from './FileUploadArea';

export const Chatbar = ({
  loading,
  conversations,
  lightMode,
  selectedConversation,
  apiKey,
  serverSideApiKeyIsSet,
  pluginKeys,
  serverSidePluginKeysSet,
  folders,
  onCreateFolder,
  onDeleteFolder,
  onUpdateFolder,
  onNewConversation,
  onToggleLightMode,
  onSelectConversation,
  onDeleteConversation,
  onUpdateConversation,
  onApiKeyChange,
  onClearConversations,
  onPluginKeyChange,
  onClearPluginKey,
}) => {
  const { t } = useTranslation('sidebar');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredConversations, setFilteredConversations] =
    useState(conversations);

  const handleUpdateConversation = (
    conversation,
    data,
  ) => {
    onUpdateConversation(conversation, data);
    setSearchTerm('');
  };

  const handleDeleteConversation = (conversation) => {
    onDeleteConversation(conversation);
    setSearchTerm('');
  };

  const handleDrop = (e) => {
    if (e.dataTransfer) {
      const conversation = JSON.parse(e.dataTransfer.getData('conversation'));
      onUpdateConversation(conversation, { key: 'folderId', value: 0 });

      e.target.style.background = 'none';
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const highlightDrop = (e) => {
    e.target.style.background = '#343541';
  };

  const removeHighlight = (e) => {
    e.target.style.background = 'none';
  };

  useEffect(() => {
    if (searchTerm) {
      setFilteredConversations(
        conversations.filter((conversation) => {
          const searchable =
            conversation.name.toLocaleLowerCase() +
            ' ' +
            conversation.messages.map((message) => message.content).join(' ');
          return searchable.toLowerCase().includes(searchTerm.toLowerCase());
        }),
      );
    } else {
      setFilteredConversations(conversations);
    }
  }, [searchTerm, conversations]);

  return (
    <div
      className={`fixed top-0 bottom-0 z-50 flex h-full w-[260px] flex-none flex-col space-y-2 bg-[#25292A] p-2 transition-all sm:relative sm:top-0`}
    >
      <div className="flex items-center">
        <button
          className="flex w-[190px] flex-shrink-0 cursor-pointer select-none items-center gap-3 rounded-md border border-white/20 p-3 text-[14px] leading-normal text-white transition-colors duration-200 hover:bg-indigo-700 bg-indigo-600"
          onClick={() => {
            onNewConversation();
            setSearchTerm('');
          }}
        >
          <IconPlus size={18} />
          {t('New chat')}
        </button>

        <button
          className="ml-2 flex flex-shrink-0 cursor-pointer items-center gap-3 rounded-md border border-white/20 p-3 text-[14px] leading-normal text-white transition-colors duration-200 hover:bg-gray-500/10"
          onClick={() => onCreateFolder(t('New folder'))}
        >
          <IconFolderPlus size={18} />
        </button>
      </div>

      {conversations.length > 1 && (
        <Search
          placeholder="Search conversations..."
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
        />
      )}

      <div className="flex-grow overflow-auto">
        {folders.length > 0 && (
          <div className="flex border-b border-white/20 pb-2">
            <ChatFolders
              searchTerm={searchTerm}
              conversations={filteredConversations.filter(
                (conversation) => conversation.folderId,
              )}
              folders={folders}
              onDeleteFolder={onDeleteFolder}
              onUpdateFolder={onUpdateFolder}
              selectedConversation={selectedConversation}
              loading={loading}
              onSelectConversation={onSelectConversation}
              onDeleteConversation={handleDeleteConversation}
              onUpdateConversation={handleUpdateConversation}
            />
          </div>
        )}

        {conversations.length > 0 ? (
          <div
            className="pt-2"
            onDrop={(e) => handleDrop(e)}
            onDragOver={allowDrop}
            onDragEnter={highlightDrop}
            onDragLeave={removeHighlight}
          >
            <Conversations
              loading={loading}
              conversations={filteredConversations.filter(
                (conversation) => !conversation.folderId,
              )}
              selectedConversation={selectedConversation}
              onSelectConversation={onSelectConversation}
              onDeleteConversation={handleDeleteConversation}
              onUpdateConversation={handleUpdateConversation}
            />
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center gap-3 text-sm leading-normal text-white opacity-50">
            <IconMessagesOff />
            {t('No conversations.')}
          </div>
        )}
      </div>

      {/* <FileUploadArea /> */}

      <ChatbarSettings
        lightMode={lightMode}
        apiKey={apiKey}
        serverSideApiKeyIsSet={serverSideApiKeyIsSet}
        pluginKeys={pluginKeys}
        serverSidePluginKeysSet={serverSidePluginKeysSet}
        conversationsCount={conversations.length}
        onToggleLightMode={onToggleLightMode}
        onApiKeyChange={onApiKeyChange}
        onClearConversations={onClearConversations}
        onPluginKeyChange={onPluginKeyChange}
        onClearPluginKey={onClearPluginKey}
      />

    </div>
  );
};
