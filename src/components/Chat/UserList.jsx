import React, { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";

const UserList = () => {
  const { users, getUsers, setSelectedUser, selectedUser } = useChatStore();
  const { authAdmin } = useAuthStore();

  useEffect(() => {
    if (authAdmin) {
      getUsers(); // Fetch users assigned to the admin
    }
  }, [authAdmin, getUsers]);

  const handleSelectUser = (user) => {
    setSelectedUser({ id: user.id, name: user.f_name + " " + user.l_name, type: "user" });
    toast.success(`Chat opened with ${user.f_name} ${user.l_name}`);
  };

  return (
    <div className="p-4 border-r h-full overflow-y-auto bg-gray-100">
      <h2 className="text-lg font-bold mb-2">Users</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No users assigned.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => handleSelectUser(user)}
              className={`p-2 cursor-pointer rounded-md ${
                selectedUser?.id === user.id ? "bg-blue-200" : "hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border"
                />
                <span className="text-sm">{user.f_name} {user.l_name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
