import { Server, Socket } from "socket.io";
import { IDirectChatHandler } from "../../../entities/socketHandlersInterfaces/IDirect-chat.handler.interface";
import { directChantHandler } from "../../../frameworks/di/resolver";
import { DIRECT_CHAT_EVENTS } from "../../../shared/constants/constants";

export class DirectChatEvents {
  private _handler!: IDirectChatHandler;

  constructor(
    private socket: Socket,
    private io: Server,
  ) {
    this._handler = directChantHandler;
    this._handler.setSocket(this.socket, this.io);
  }

  register() {
    console.log("register triggered success");
    this.socket.on(DIRECT_CHAT_EVENTS.SEND_MESSAGE, (data) => {
      this._handler.handleSendMessage(this.socket, data);
    });
  }
}
