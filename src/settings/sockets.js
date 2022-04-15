
import io from "socket.io-client";
import { server_url } from "./base-url";
// настройка сокета 
export const initSocket = (auth) => {
    const socket = io(server_url, {
        auth: { token: auth },
        transports: ["websocket", "polling", "flashsocket"],
    });
    return socket;

}