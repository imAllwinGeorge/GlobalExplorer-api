import { ISocketUserMapRepository } from "entities/repositoryInterfaces/redis/socket-user.repository";
import { IDirectChatHandler } from "entities/socketHandlersInterfaces/IDirect-chat.handler.interface";
import { ISendDirectMessageUsecase } from "entities/usecaseInterfaces/chat/direct-message/send-message.usecase.interface";
import { DIRECT_CHAT_EVENTS } from "shared/constants/constants";
import { CustomSocket } from "shared/types/types";
import { Server, Socket } from "socket.io";
import { inject, injectable } from "tsyringe";

@injectable()
export class DirectChatHandler implements IDirectChatHandler {
  private _socket!: Socket;
  private _io!: Server;

  constructor(
    @inject("ISendDirectMessageUsecase")
    private _sendMessageUsecase: ISendDirectMessageUsecase,

    @inject("ISocketUserRepository")
    private _socketUserMapRepository: ISocketUserMapRepository,
  ) {}

  setSocket(socket: Socket, io: Server): void {
    this._socket = socket;
    this._io = io;
  }

  async handleSendMessage(
    socket: Socket,
    data: {
      receiverId: string;
      content: string;
    },
  ): Promise<void> {
    try {
      console.log(data.content);

      const senderId = (socket as CustomSocket).userId;

      const recieverSocketId =
        await this._socketUserMapRepository.getUserSocket(data.receiverId);
      const senderSocketId = await this._socketUserMapRepository.getUserSocket(
        senderId as string,
      );

      const { receiverId, content } = data;

      const result = await this._sendMessageUsecase.execute(
        senderId as string,
        receiverId,
        content,
      );

      if (recieverSocketId) {
        this._io
          .to(recieverSocketId)
          .emit(DIRECT_CHAT_EVENTS.RECEIVE_MESSAGE, result);
      }

      if (senderSocketId) {
        console.log("fall back triggered");
        this._io
          .to(senderSocketId)
          .emit(DIRECT_CHAT_EVENTS.SEND_MESSAGE, result);
      }
    } catch (error) {
      console.log("send direct message event handler:  ", error);
      this._socket.emit("error", { message: "failed to send message" });
    }
  }
}
