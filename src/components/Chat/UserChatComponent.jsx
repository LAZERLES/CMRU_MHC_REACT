import React, { useEffect, useRef } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";

const UserChatComponent = () => {
  const { messages, getMessages, isMessagesLoading, connectSocket, setSelectedUser } = useChatStore();
  const { authUser } = useAuthStore();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    connectSocket(); // Ensure real-time connection
  }, [connectSocket]);

  useEffect(() => {
    console.log("👤 Current Auth User:", authUser);

    // Ensure admin is assigned (fallback to Admin ID "1" if missing)
    const adminId = authUser?.assignedAdminId || "1";
    console.log("🎯 Assigned Admin ID:", adminId);

    if (adminId) {
      getMessages(adminId, "admin");
      setSelectedUser({ id: adminId, type: "admin", name: "Admin" }); // ✅ Select Admin for Chat
    } else {
      console.warn("⚠️ No Admin assigned to this user!");
    }
  }, [authUser, getMessages, setSelectedUser]);

  return (
    <div className="flex flex-col flex-1">
      <ChatHeader title="Chat with Admin" />
      {isMessagesLoading ? <MessageSkeleton /> : <MessageList messages={messages} />}
      <MessageInput />
    </div>
  );
};

export default UserChatComponent;
