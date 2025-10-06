import { Server, Socket } from "socket.io";

export interface INotificationHandler {
  setSocket(socket: Socket, io: Server): void;
  readNotification(
    socket: Socket,
    data: { id: string; receiverId: string },
  ): Promise<void>;
}
