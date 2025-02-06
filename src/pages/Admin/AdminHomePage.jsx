import React from "react";
import { useChatStore } from "../../store/useChatStore"
import NoChatSelected from "../../components/Chat/NoChatSelected";

import SideBar from "../../components/Navbar/SideBar";
import AdminChatComponent from "../../components/Chat/AdminChatComponent";

const AdminHomePage = () => {
    const { selectedUser } = useChatStore();


  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-200 px-4">
        <div className="bg-base-100 rounded-lg shadow-lg w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <SideBar />
            {!selectedUser ? <NoChatSelected/> : <AdminChatComponent/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
