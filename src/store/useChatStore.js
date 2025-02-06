import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import socket from "../lib/socket";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5000";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  adminId: 1,
  socket: null,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
  
      // 🔍 Debugging log to check if users are correctly set
      // console.log("🚀 Users fetched:", res.data);
      // console.log("✅ Stored user s in Zustand:", useChatStore.getState().users);
  
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users.");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  

  getMessages: async (receiverId, receiverType) => {
    set({ isMessagesLoading: true });

    try {
      const { authUser, authAdmin } = useAuthStore.getState();
      const senderId = authUser?.id || authAdmin?.id;
      const senderType = authUser ? "user" : "admin";

      const res = await axiosInstance.get(
        `/messages/${senderId}/${receiverId}`,
        {
          params: { senderType, receiverType },
        }
      );

      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages.");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { authUser, authAdmin, socket } = useAuthStore.getState();

    if (!selectedUser) {
      toast.error("No user selected.");
      return;
    }

    const payload = {
      senderId: authUser?.id || authAdmin?.id,
      senderType: authUser ? "user" : "admin",
      receiverId: selectedUser.id,
      receiverType: authUser ? "admin" : "user",
      content: messageData.content,
      image: messageData.image || null,
    };

    try {
      const res = await axiosInstance.post("/messages/send", payload);
      set({ messages: [...messages, res.data] });

      // Emit message to WebSocket
      socket?.emit("sendMessage", res.data);

      toast.success("Message sent successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message.");
    }
  },

  setSelectedUser: (user) => {
    if (!user) {
      console.warn("⚠️ No user provided to setSelectedUser.");
      return;
    }
  
    const { authUser, authAdmin } = useAuthStore.getState();
  
    const updatedUser = {
      id: user.id,
      name: user.f_name && user.l_name 
        ? `${user.f_name} ${user.l_name}` 
        : user.name || "Unknown", 
      type: user.id === "1" ? "admin" : "user", // Ensure admin is identified correctly
      profilePic: user.profilePic || "/avatar.png",
    };
  
    set({ selectedUser: updatedUser });
  
    console.log("✅ Selected User Set:", updatedUser);
  },
  
  
  clearMessages: () => set({ messages: [] }),  // Add this function

  
  connectSocket: () => {
    const { authUser, authAdmin } = useAuthStore.getState();
    if (!authUser && !authAdmin) return;
  
    const userId = authUser?.id;
    const adminId = authAdmin?.id;
    
    if (!userId && !adminId) {
      return console.warn("⚠️ No valid user ID or admin ID found for socket connection.");
    }
  
    const existingSocket = get().socket;
    if (existingSocket && existingSocket.connected) return;
  
    const newSocket = io(BASE_URL, {
      query: { 
        userId: userId || null,
        adminId: adminId || null 
      },
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
  
    newSocket.on("connect", () => {
      console.log(`✅ Socket connected: ${newSocket.id}`);
      set({ socket: newSocket });
  
      if (typeof get().subscribeToMessages === "function") {
        get().subscribeToMessages();
      } else {
        console.warn("⚠️ subscribeToMessages is not defined.");
      }
    });
  
    newSocket.on("disconnect", () => console.warn("⚠️ Socket disconnected."));
    newSocket.on("connect_error", (err) => console.error("❌ Socket connection error:", err));
  },

  subscribeToMessages: () => {
    const { socket } = get();
    if (!socket || !socket.connected) {
      console.warn("⚠️ No socket connection in subscribeToMessages, retrying...");
      return;
    }
  
    console.log("[useChatStore] ✅ Subscribing to messages...");
  
    // Remove existing listeners to avoid duplicates
    socket.off("newMessage");
  
    socket.on("newMessage", (message) => {
      console.log("[useChatStore] 📩 Received new message:", message);
  
      set((state) => {
        // Prevent duplicate messages using message ID
        const isDuplicate = state.messages.some((msg) => msg.id === message.id);
        if (isDuplicate) {
          console.warn("[useChatStore] ⚠️ Duplicate message detected, ignoring.");
          return state;
        }
  
        return { messages: [...state.messages, message] };
      });
    });
  }
}));
