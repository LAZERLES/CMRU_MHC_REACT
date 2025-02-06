import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true,
  autoConnect: false, // Start with manual connection
});

export const connectSocket = (userId) => {
  socket.io.opts.query = { userId }; // Pass userId dynamically
  socket.connect();

  socket.on("connect", () => {
    console.log(`✅ Socket connected: ${socket.id}`);
  });

  socket.on("connect_error", (err) => {
    console.error("⚠️ Connection Error:", err);
  });
};

export default socket;
