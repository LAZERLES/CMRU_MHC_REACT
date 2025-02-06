import React from 'react'
import NoChatSelected from '../../components/Chat/NoChatSelected'
import SideBar from '../../components/Navbar/SideBar'
import UserLayout from '../../layout/UserLayout'
import { useAuthStore } from '../../store/useAuthStore'
import { useChatStore } from '../../store/useChatStore'
import BackToHomeButton from '../../components/Button/BackToHomeButton'
import UserChatComponent from '../../components/Chat/UserChatComponent'

const UserChatPage = () => {

  const { selectedUser } = useChatStore();

  return (
    <UserLayout>
    <div className="h-screen bg-base-200 py-20 relative">
          <BackToHomeButton className='absolute top-3 left-14'/>
      <div className="flex items-center justify-center pt-200 px-4">
        <div className="bg-base-100 rounded-lg shadow-lg w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
          {<UserChatComponent/>}
          </div>
        </div>
      </div>
    </div>
    </UserLayout>
  )
}

export default UserChatPage