import { INotificationHandler } from "entities/socketHandlersInterfaces/INotification.handler.interface";
import { IReadNotificationUsecase } from "entities/usecaseInterfaces/notification/read-notification.interface";
import { NOTIFICATION_EVENT } from "shared/constants/constants";
import { Server, Socket } from "socket.io";
import { inject, injectable } from "tsyringe";

@injectable()
export class NotifcationHandler implements INotificationHandler {
  private _socket!: Socket;
  private _io!: Server;

  constructor(
    @inject("IReadNotificationUsecase")
    private _readNotificationUsecase: IReadNotificationUsecase,
  ) {}

  setSocket(socket: Socket, io: Server) {
    this._socket = socket;
    this._io = io;
  }

  async readNotification(
    socket: Socket,
    data: { id: string; receiverId: string },
  ): Promise<void> {
    const result = await this._readNotificationUsecase.execute(
      data.id,
      data.receiverId,
    );
    console.log("notification handler result: ", result.socketId);
    this._io
      .to(result.socketId)
      .emit(NOTIFICATION_EVENT.READ_NOTIFICATION, result.notification);
  }
}
