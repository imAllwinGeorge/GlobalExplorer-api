import { Server, Socket } from "socket.io";

export interface IDirectChatHandler {
  setSocket(socket: Socket, io: Server): void;
  handleSendMessage(
    socket: Socket,
    data: {
      senderId: string;
      receiverId: string;
      content: string;
    },
  ): Promise<void>;
  // handleReadMessage(data: string): Promise<void>;
}
