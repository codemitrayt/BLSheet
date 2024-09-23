import { io } from "socket.io-client";
const socket = io(import.meta.env.VITE_BACKEND_URL, {
  transports: ["websocket"],
  secure: true,
});

socket.on("connect", () => {
  console.log("Connected to the server", socket.id);
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server", socket.id);
});

export default socket;
