import React, { useRef, useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";

const MessageList = ({ messages }) => {
  const { authUser, authAdmin } = useAuthStore();
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        // Identify if the current logged-in user is the sender
        const isSender =
          message.senderId === authUser?.id || message.senderId === authAdmin?.id;

        return (
          <div
            key={message.id}
            className={`flex ${isSender ? "justify-end" : "justify-start"}`}
          >
            <div className="flex items-end space-x-2">
              {/* Show profile pic for the other sender (receiver) */}
              {!isSender && (
                <img
                  src={message.senderProfilePic || "/avatar.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border"
                />
              )}
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  isSender ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                }`}
              >
                <p>{message.content}</p>
                {message.image && (
                  <img
                    src={message.image}
                    alt="Sent"
                    className="mt-2 max-w-xs max-h-60 rounded-lg"
                  />
                )}
                <time className="block text-xs opacity-50 mt-1 text-right">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </time>
              </div>
              {/* Show profile pic for the sender */}
              {isSender && (
                <img
                  src={
                    authUser?.profilePic || authAdmin?.profilePic || "/avatar.png"
                  }
                  alt="Profile"
                  className="w-8 h-8 rounded-full border"
                />
              )}
            </div>
          </div>
        );
      })}
      {/* Empty div to keep scroll at bottom */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
