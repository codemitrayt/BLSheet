import { createContext, useContext, useEffect } from "react";
import { Socket } from "socket.io-client";

import socket from "../socket";

export const SocketContext = createContext<Socket | null>(null);

export const useSocketProvider = () => {
  const socket = useContext(SocketContext);
  if (!socket) throw new Error("Socket context not found");
  return socket;
};

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server", socket.id);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
