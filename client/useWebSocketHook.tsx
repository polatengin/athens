import { io } from "socket.io-client";

export const useWebSocketHook = () => {

  const socket = io({
    path: "/api/websocket/socket.io"
  });

  return socket;

};
