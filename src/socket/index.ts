import { io } from "socket.io-client";
const socket = io("http://localhost:5500");

socket.on("connect", () => {
  console.log("Connected to the server", socket.id);
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server", socket.id);
});

export default socket;
