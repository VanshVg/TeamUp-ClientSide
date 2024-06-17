import { io } from "socket.io-client";

export const socket = io(process.env.REACT_APP_BACKEND_URL as string, {
  transports: ["websocket"],
});
