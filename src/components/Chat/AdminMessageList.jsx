import React, { useRef, useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";

const AdminMessageList = ({ messages }) => {
  const { authAdmin, checkAuth } = useAuthStore(); // Access admin data
  const messagesEndRef = useRef(null);



  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  

  if (!authAdmin) {
    return <div>Loading admin data...</div>; // Optional: Show a loading state if admin data isn't available
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        // Ensure the sender ID is correctly checked
        const isAdminSender = message.senderId === authAdmin.id;

        return (
          <div
            key={message.id}
            className={`flex ${isAdminSender ? "justify-end" : "justify-start"}`}
          >
            <div className="flex items-end space-x-2">
              {/* Display user profile picture */}
              {!isAdminSender && (
                <img
                  src={message.senderProfilePic || "/avatar.png"}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full border"
                />
              )}
              {/* Display message content */}
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  isAdminSender ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
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
              {/* Display admin profile picture */}
              {isAdminSender && (
                <img
                  src={authAdmin?.profilePic || "/avatar.png"}
                  alt="Admin Profile"
                  className="w-8 h-8 rounded-full border"
                />
              )}
            </div>
          </div>
        );
      })}
      {/* Empty div to keep scroll at the bottom */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default AdminMessageList;
