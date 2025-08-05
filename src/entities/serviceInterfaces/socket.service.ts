import { Server } from "socket.io";

export interface ISocketServices {
  setIO(io: Server): void;

  getIO(): Server;
}
