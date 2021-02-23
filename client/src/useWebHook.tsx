import { io } from "socket.io-client";

export const useWebHook = () => {

  const socket = io({
    path: "/api/websocket/socket.io"
  });

  return socket;

};
