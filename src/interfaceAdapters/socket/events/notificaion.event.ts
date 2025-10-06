import { Server, Socket } from "socket.io";
import { INotificationHandler } from "../../../entities/socketHandlersInterfaces/INotification.handler.interface";
import { notificationHandler } from "../../../frameworks/di/resolver";
import { NOTIFICATION_EVENT } from "../../../shared/constants/constants";

export class NotificationEvent {
  private _handler!: INotificationHandler;

  constructor(
    private _socket: Socket,
    private _io: Server,
  ) {
    this._handler = notificationHandler;
    this._handler.setSocket(this._socket, this._io);
  }

  async register() {
    console.log("notification event triggered");
    this._socket.on(NOTIFICATION_EVENT.READ_NOTIFICATION, (data) => {
      this._handler.readNotification(this._socket, data);
    });
  }
}
