import { Routes, Route, Navigate } from "react-router-dom";
import UserHomePage from "./pages/User/UserHomePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import UserLoginPage from "./pages/User/UserLoginPage";
import UserSettingPage from "./pages/User/UserSettingPage";
import UserProfilePage from "./pages/User/UserProfilePage";
import { Toaster } from "react-hot-toast";
import UserChatPage from "./pages/User/UserChatPage";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import AdminLoginPage from "./pages/Admin/AdminLoginPage";
import AdminLayout from "./layout/AdminLayout";
import AdminCounselingPage from "./pages/Admin/AdminCounselingPage";
import AdminProfilePage from "./pages/Admin/AdminProfilePage";
import UserThreadPage from "./pages/User/UserThreadPage";
import CreateThreadPage from "./components/Thread/CreateThreadPage";
import ThreadDetailPage from "./components/Thread/ThreadDetailPage";
import MenuComponent from "./components/MenuComponent";
import SelectActivity from "./components/Activity/SelecActivity";
import { useThemeStore } from "./store/useThemeStore";
import UserAssessmentPage from "./pages/User/UserAssessmentPage";
import UserLearningPage from "./pages/User/UserLearningPage";
import AdminAssessmentPage from "./pages/Admin/AdminAssessmentPage";
import AdminLearningComp from "./components/Learning/AdminLearningComponent";
import AdminLearningPage from "./pages/Admin/AdminLearningPage";
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage";
import AdminActivityPage from "./pages/Admin/AdminActivityPage";
import UserCalendarPage from "./pages/User/UserCalendarPage";
import AdminCommunityPage from "./pages/Admin/AdminCommunityPage";

function App() {
  const { authUser, authAdmin, checkAuth, isCheckingAuth, onlineUsers } =
    useAuthStore();
    // const {theme} = useThemeStore();

  // console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div  data-theme="" className=" font-prompt_fontFamily">
      <Routes>
        <Route
          exact
          path="/"
          element={authUser ? <UserHomePage /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/login"
          element={!authUser ? <UserLoginPage /> : <Navigate to="/" />}
        />
        <Route exact path="/setting" element={<UserSettingPage />} />
        <Route
          exact
          path="/Select-Activity"
          element={authUser ? <SelectActivity /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/select-assessment"
          element={authUser ? <UserAssessmentPage /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/calendarview"
          element={authUser ? <UserCalendarPage /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/profile"
          element={authUser ? <UserProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/learning"
          element={authUser ? <UserLearningPage /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/counseling"
          element={authUser ? <UserChatPage /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/community"
          element={authUser ? <UserThreadPage /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/create-thread"
          element={authUser ? <CreateThreadPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/community/:threadId"
          element={authUser ? <ThreadDetailPage /> : <Navigate to="/login" />}
        />




        {/* Admin */}
        <Route
          exact
          path="/admin/login"
          element={!authAdmin ? <AdminLoginPage /> : <Navigate to="/admin/" />}
        />

        <Route
          path="/admin/"
          element={authAdmin ? <AdminLayout /> : <Navigate to="/admin/login" />}
        >
          <Route
            index
            element={
              authAdmin ? <AdminHomePage /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="dashboard"
            element={
              authAdmin ? (
                <AdminDashboardPage />
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />
          <Route
            path="counseling"
            element={
              authAdmin ? (
                <AdminCounselingPage />
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />
          <Route
            path="profile"
            element={
              authAdmin ? <AdminProfilePage /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="assessment"
            element={
              authAdmin ? <AdminAssessmentPage /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="activity"
            element={
              authAdmin ? <AdminActivityPage /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="Community"
            element={
              authAdmin ? <AdminCommunityPage /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="learning"
            element={
              authAdmin ? <AdminLearningPage /> : <Navigate to="/admin/login" />
            }
          />
        </Route>
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
