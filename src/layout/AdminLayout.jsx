import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { BookPlus, LayoutDashboard, ListTodo, MessageSquareText, Play, User, UserRoundPen } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
const AdminLayout = () => {
  const [activeLink, setActiveLink] = useState("dashboard");
  const { authAdmin, logoutAdmin } = useAuthStore();

  
  console.log("adminAuth", authAdmin);
  

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <aside className="bg-base-200 p-4 md:w-64">
        <div className="flex items-center mb-4">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={authAdmin?.profilePic || "/avatar.png"} alt="Avatar" />
            </div>
          </div>
          <span className="ml-2 text-lg font-semibold">
            {authAdmin?.f_name} {authAdmin?.l_name}
          </span>
        </div>
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/dashboard"
              className={`block p-2 rounded-md ${
                activeLink === "dashboard"
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleLinkClick("dashboard")}
            >
              <span className="flex items-center gap-2">
                <LayoutDashboard />
                กระดานสถิติ
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/counseling"
              className={`block p-2 rounded-md ${
                activeLink === "counseling"
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleLinkClick("counseling")}
            >
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0"
                  />
                </svg>
                ให้คำปรึกษา
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/profile"
              className={`block p-2 rounded-md ${
                activeLink === "profile"
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleLinkClick("profile")}
            >
              <span className="flex items-center gap-2">
                <UserRoundPen />
                โปรไฟล์
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/activity"
              className={`block p-2 rounded-md ${
                activeLink === "activity"
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleLinkClick("activity")}
            >
              <span className="flex items-center gap-2">
                  <Play/>
                กิจกรรม
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/assessment"
              className={`block p-2 rounded-md ${
                activeLink === "assessment"
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleLinkClick("assessment")}
            >
              <span className="flex items-center gap-2">
                <ListTodo />
                แบบประเมินสุขภาพจิต
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/community"
              className={`block p-2 rounded-md ${
                activeLink === "community"
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleLinkClick("community")}
            >
              <span className="flex items-center gap-2">
                <MessageSquareText/>
                ชุมชน
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className={`block p-2 rounded-md ${
                activeLink === "users"
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleLinkClick("users")}
            >
              <span className="flex items-center gap-2">
                <User/>
                ผู้ใช้งาน
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/learning"
              className={`block p-2 rounded-md ${
                activeLink === "learning"
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleLinkClick("learning")}
            >
              <span className="flex items-center gap-2">
                <BookPlus/>
                ความรู้
              </span>
            </Link>
          </li>
          <li>
            <button className="btn-md w-full btn btn-error p-2 rounded-md hover:bg-gray-100" onClick={logoutAdmin}>Logout</button>
          </li>
        </ul>
      </aside>
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
