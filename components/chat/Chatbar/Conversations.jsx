import { ConversationComponent } from './Conversation';

export const Conversations= ({
  loading,
  conversations,
  selectedConversation,
  onSelectConversation,
  onDeleteConversation,
  onUpdateConversation,
}) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {conversations
        .slice()
        .reverse()
        .map((conversation, index) => (
          <ConversationComponent
            key={index}
            selectedConversation={selectedConversation}
            conversation={conversation}
            loading={loading}
            onSelectConversation={onSelectConversation}
            onDeleteConversation={onDeleteConversation}
            onUpdateConversation={onUpdateConversation}
          />
        ))}
    </div>
  );
};
