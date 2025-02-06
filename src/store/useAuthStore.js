import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client"

const BASE_URL = "http://localhost:5000";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    authAdmin: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers:[],
    socket:null,


    checkAuth: async () => {
      try {
        const res = await axiosInstance.get("/auth/user/check");
        set({ authUser: res.data });
  
        get().connectSocket();
      } catch (error) {
        console.log("Error in checkAuth:", error);
        set({ authUser: null });
      }
  
      try {
        const AdminRes = await axiosInstance.get("/auth/admin/check");
        set({ authAdmin: AdminRes.data });
  
        get().connectSocket();
      } catch (error) {
        set({ authAdmin: null });
      }
  
      set({ isCheckingAuth: false });
    },

    signup: async (data) => {
      set({ isSigningUp: true });
      try {
        // Ensure email is valid before proceeding
        if (!data.email.endsWith('@g.cmru.ac.th')) {
          toast.error("Only emails with @g.cmru are allowed.");
          return;
        }
    
        const res = await axiosInstance.post("/auth/user/signup", data);
        set({ authUser: res.data });
    
        toast.success("Sign up successful");
    
        get().connectSocket();
      } catch (error) {
        console.error("Error during signup:", error);
        toast.error(error.response?.data?.message || "Signup failed");
      } finally {
        set({ isSigningUp: false });
      }
    },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const { email, password } = data;
      const res = await axiosInstance.post("/auth/user/login", { email, password });
      set({ authUser: res.data });
      toast.success("Login successful");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  loginWithGoogle: async (idToken) => {
    try {
      // console.log("Sending ID Token to backend:", idToken);  // Log the ID token
    
    const res = await axiosInstance.post("/auth/user/google", { idToken });

    const userEmail = res.data.email;
    
    if (!userEmail.endsWith('@g.cmru.ac.th')) {
      throw new Error("Only emails with @g.cmru are allowed.");
    }
    
    console.log("Response from Google login:", res.data);  // Log the response data
    
    set({ authUser: res.data });

    toast.success(`Welcome ${res.data.f_name} ${res.data.l_name} 🎉`, {
      duration: 3000,
      position: "top-center",
      style: {
        background: "#333",
        color: "#fff",
        fontSize: "16px",
      },
    });

    get().connectSocket();
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.response?.data?.message || "Google login failed");
    }
  },
  

  logout: async () => {
    try {
      await axiosInstance.post("/auth/user/logout");
      set({ authUser: null });
      toast.success("Logout successful");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/user/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      set({ isUpdatingProfile: false });
    }
  },

  AdminupdateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/admin/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      set({ isUpdatingProfile: false });
    }
  },

   // Admin Login
  loginAdmin: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/admin/login", data);
      set({ authAdmin: res.data });
      toast.success("Admin login successful");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Admin login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

   // Admin Logout
   logoutAdmin: async () => {
    try {
      await axiosInstance.post("/auth/admin/logout");
      set({ authAdmin: null });
      toast.success("Admin logged out");

      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },


  connectSocket: () => {
    const { authUser, authAdmin, socket } = get();
    if ((!authUser && !authAdmin) || socket?.connected) return;
  
    const newSocket = io(BASE_URL, {
      query: { 
        userId: authUser?.id || null,
        adminId: authAdmin?.id || null
      },
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
  
    newSocket.on("newMessage", (message) => {
      console.log("📩 Received new message:", message);
      // Use getState() to avoid circular dependency
      const chatStore = useChatStore.getState();
      chatStore.addMessage(message);
    });
  
    newSocket.connect();
    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      // console.log("Socket disconnected");
    }
    set({ socket: null, onlineUsers: [] });
    toast.success("Socket disconnected");
  },
}));
