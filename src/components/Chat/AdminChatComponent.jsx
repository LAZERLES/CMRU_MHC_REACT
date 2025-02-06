import React, { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import UserList from "./UserList";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import AdminMessageList from "./AdminMessageList";

const AdminChatComponent = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser,connectSocket,subscribeToMessages } = useChatStore();

  useEffect(() => {
    if (selectedUser?.id) {
      getMessages(selectedUser.id, "user");
    }
  }, [selectedUser, getMessages]);


  useEffect(() => {
    connectSocket(); // Ensure real-time connection
    subscribeToMessages(); // Subscribe to new messages
  }, [connectSocket, subscribeToMessages]);

  return (
    <div className="flex flex-row w-full h-full">
      {/* Sidebar with user list */}

      {/* Chat window */}
      <div className="flex flex-col flex-1">
        {selectedUser ? (
          <>
            <ChatHeader title={`Chat with ${selectedUser.name}`} />
            {isMessagesLoading ? <MessageSkeleton /> : <AdminMessageList messages={messages} />}
            <MessageInput />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a user to chat
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChatComponent;
