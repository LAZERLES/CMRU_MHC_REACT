import React, { useEffect } from "react";
import UserLayout from "../../layout/UserLayout";
import { MessageCircle } from "lucide-react";
import MenuComponent from "../../components/MenuComponent";
import { useAuthStore } from "../../store/useAuthStore";

const UserHomePage = () => {
  const { authUser,checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  },[checkAuth])

  return (
    <UserLayout>
      <MenuComponent/>
    </UserLayout>
  );
};

export default UserHomePage;
