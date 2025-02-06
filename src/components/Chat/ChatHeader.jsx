import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // Log selectedUser data for debugging
  useEffect(() => {
    console.log("[ChatHeader] Selected User Data:", selectedUser);
  }, [selectedUser]);

  // Prevent crash when no user is selected
  if (!selectedUser) {
    return (
      <div className="p-3 border-b border-base-300 text-center">
        <h3 className="text-gray-500">Select a user to start chatting</h3>
      </div>
    );
  }

  // Ensure onlineUsers includes a valid selectedUser ID
  const isOnline = selectedUser?.id && onlineUsers.includes(selectedUser.id);
  const userName =
    selectedUser?.name ||
    `${selectedUser?.f_name || ""} ${selectedUser?.l_name || ""}`.trim() ||
    "Unknown User";

  return (
    <div className="p-3 border-b border-base-300 flex items-center justify-between">
      {/* User Info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative w-10 h-10 rounded-full border overflow-hidden">
          <img
            src={selectedUser.profilePic || "/avatar.png"}
            alt={userName}
            onError={(e) => { e.target.onerror = null; e.target.src = "/avatar.png"; }}
          />
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${
              isOnline ? "bg-green-500" : "bg-gray-400"
            }`}
          />
        </div>

        {/* User Details */}
        <div>
          <h3 className="font-medium">{userName}</h3>
        </div>
      </div>

      {/* Close Button (Admins only) */}
      {setSelectedUser && (
        <button onClick={() => setSelectedUser(null)} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ChatHeader;
