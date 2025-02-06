import React, { useEffect, useCallback } from "react";
import { useChatStore } from "../../store/useChatStore";
import SidebarSkeleton from "../Chat/skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";

const SideBar = () => {
  const { users, getUsers, setSelectedUser, selectedUser } = useChatStore();
  const { authAdmin, onlineUsers } = useAuthStore();

  useEffect(() => {
    if (authAdmin) {
      getUsers(); // Fetch users assigned to the admin
    }
  }, [authAdmin, getUsers]);

  useEffect(() => {
    console.log("Online Users:", onlineUsers); // Debugging
  }, [onlineUsers]);
  

  // Prevent unnecessary re-renders
  const handleSelectUser = useCallback(
    (user) => {
      setSelectedUser({
        id: user.id,
        name: `${user.f_name} ${user.l_name}`,
        type: "user",
      });
      toast.success(`Chat opened with ${user.f_name} ${user.l_name}`);
    },
    [setSelectedUser]
  );

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-3">
        {users?.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className={`p-2 cursor-pointer rounded-md flex items-center gap-2 relative
                  ${
                    selectedUser?.id === user.id
                      ? "bg-blue-200"
                      : "hover:bg-gray-200"
                  }`}
              >
                {/* User Avatar */}
                <div className="relative">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full border"
                  />
                  {onlineUsers.includes(user.id) && (
                    <span
                      className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 
                      rounded-full ring-2 ring-white"
                    />
                  )}
                </div>

                {/* User Name */}
                <span className="text-sm">{user.f_name} {user.l_name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No users assigned.</p>
        )}
      </div>
    </aside>
  );
};

export default SideBar;
