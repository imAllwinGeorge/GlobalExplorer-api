import { ISocketServices } from "entities/serviceInterfaces/socket.service";
import { Server } from "socket.io";
import { injectable } from "tsyringe";

@injectable()
export class SocketServices implements ISocketServices {
  private _io!: Server;

  setIO(io: Server): void {
    this._io = io;
    // console.log("socket setup", this._io);
  }
  getIO(): Server {
    if (!this._io) {
      console.log("there is not socket.");
      throw new Error("Socket.io instance not set.");
    }

    return this._io;
  }
}
