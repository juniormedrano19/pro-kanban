import { io, Socket } from "socket.io-client";
import { BASE_URL } from "./endpoints";

export const socket:Socket = io(`${BASE_URL}`);