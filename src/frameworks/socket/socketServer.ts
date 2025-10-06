import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { inject, injectable } from "tsyringe";
import cookie from "cookie";
import { ISocketServices } from "../../entities/serviceInterfaces/socket.service";
import { IJwtservice } from "../../entities/serviceInterfaces/jwt-services.interface";
import { ISocketUserMapRepository } from "../../entities/repositoryInterfaces/redis/socket-user.repository";
import { config } from "../../shared/config";
import { CustomSocket } from "../../shared/types/types";
import { DirectChatEvents } from "../../interfaceAdapters/socket/events/direct-chat.events";
import { NotificationEvent } from "../../interfaceAdapters/socket/events/notificaion.event";
import { SignallingEvents } from "../../interfaceAdapters/socket/events/Signalling.events";

@injectable()
export class SocketServer {
  private _io!: Server;

  constructor(
    @inject("ISocketServices")
    private _socketServices: ISocketServices,

    @inject("IJwtService")
    private _tokenService: IJwtservice,

    @inject("ISocketUserRepository")
    private _socketUserRepoitory: ISocketUserMapRepository,
  ) {}

  public initialize(httpServer: HttpServer): void {
    this._io = new Server(httpServer, {
      cors: {
        origin: config.cors.ALLOWED_ORIGIN,
        credentials: true,
      },
    });

    this._io.use(async (socket, next) => {
      try {
        const role = socket.handshake.query.role;
        const cookieHeader = socket.handshake.headers.cookie;
        const cookies = cookie.parse(cookieHeader as string);
        const token = cookies[`${role}AccessToken`];

        if (!token) {
          return next(new Error("Unauthorzed socket connection"));
        }

        const payload = this._tokenService.verifyToken(token as string);
        console.log("payload in socket middleware: ", payload);
        (socket as CustomSocket).userId = payload.userId;
        return next();
      } catch (error) {
        console.log("Socket middleware error: ", error);
        return next(new Error("Unauthorzed socket connection"));
      }
    });

    this._socketServices.setIO(this._io);
  }

  public getIO(): Server {
    return this._io;
  }

  public onConnection(callback: (socket: Socket) => void): void {
    this._io.on("connection", async (socket) => {
      const userId = (socket as CustomSocket).userId;
      // console.log("userSocket Id :     :    socket Id: ", socket.id);
      await this._socketUserRepoitory.setUserSocket(
        userId as string,
        socket.id,
      );
      await this._socketUserRepoitory.setUserSocket(
        socket.id,
        userId as string,
      );
      socket.join(userId as string);
      console.log(
        `User ${userId} with socket ${socket.id} has joined room: ${userId}`,
      );
      socket.on("disconnect", async () => {
        await this._socketUserRepoitory.removeUserSocket(userId as string);
        await this._socketUserRepoitory.removeUserSocket(socket.id as string);
      });

      callback(socket);

      const directChatEvents = new DirectChatEvents(socket, this._io);
      const notificationEvent = new NotificationEvent(socket, this._io);
      const signallingEvent = new SignallingEvents(socket, this._io);

      directChatEvents.register();
      notificationEvent.register();
      signallingEvent.register();
    });
  }
}
