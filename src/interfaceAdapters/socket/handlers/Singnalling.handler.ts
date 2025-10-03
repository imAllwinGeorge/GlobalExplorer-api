// import { ISocketUserMapRepository } from "entities/repositoryInterfaces/redis/socket-user.repository";
// import { ISignallingHandler } from "entities/socketHandlersInterfaces/ISignalling.handler.interface";
// import { VIDEO_CALL_EVENT } from "shared/constants/constants";
// import { Server, Socket } from "socket.io";
// import { inject, injectable } from "tsyringe";

// @injectable()
// export class SignallingHandler implements ISignallingHandler {
//   private _socket!: Socket;
//   private _io!: Server;
//   constructor(
//     @inject("ISocketUserRepository")
//     private _socketUserMapRepository: ISocketUserMapRepository
//   ) {}

//   setSocket(socket: Socket, io: Server) {
//     this._socket = socket;
//     this._io = io;
//   }

//   async sendCandidate(data): void {
//     // const receiverSocketId = await this._socketUserMapRepository.getUserSocket(
//     //   data.receiverId,
//     // );
//     console.log("candidate event triggered.......");
//     this._io
//       .to(data.receiverId as string)
//       .emit(VIDEO_CALL_EVENT.ICECANDIDATE, data);
//   }

//   async sendOffer(data): void {
//     // const receiverSocketId = await this._socketUserMapRepository.getUserSocket(
//     //   data.calleeId as string
//     // );
//     console.log("offer event triggered.......")
//     this._io.to(data.calleeId as string).emit(VIDEO_CALL_EVENT.OFFER, data);
//   }

//   async sendAnswer(data: any): void {
//     // const receiverSocketId = await this._socketUserMapRepository.getUserSocket(
//     //   data.calleeId as string
//     // );
//     console.log("answer evnent triggered........")
//     this._io.to(data.calleeId as string).emit(VIDEO_CALL_EVENT.ANSWER, data);
//   }
// }
// import { ISocketUserMapRepository } from "entities/repositoryInterfaces/redis/socket-user.repository";
// import { ISignallingHandler } from "entities/socketHandlersInterfaces/ISignalling.handler.interface";
// import { VIDEO_CALL_EVENT } from "shared/constants/constants";
// import { Server, Socket } from "socket.io";
// import { inject, injectable } from "tsyringe";

// @injectable()
// export class SignallingHandler implements ISignallingHandler {
//   private _socket!: Socket;
//   private _io!: Server;
//   constructor(
//     @inject("ISocketUserRepository")
//     private _socketUserMapRepository: ISocketUserMapRepository,
//   ) {}

//   setSocket(socket: Socket, io: Server) {
//     this._socket = socket;
//     this._io = io;
//   }

//   async sendCandidate(data: {
//     receiverId: string;
//     [key: string]: any;
//   }): Promise<void> {
//     console.log("Looking up socket for receiverId:", data.receiverId);
//     const receiverSocketId = await this._socketUserMapRepository.getUserSocket(
//       data.receiverId,
//     );

//     if (receiverSocketId) {
//       console.log(
//         `Found socket ${receiverSocketId}  ${data.receiverId}. Sending candidate.`,
//       );
//       this._io.to(receiverSocketId).emit(VIDEO_CALL_EVENT.ICECANDIDATE, data);
//     } else {
//       console.warn(
//         `Could not find socket for user ${data.receiverId}. User might be offline.`,
//       );
//     }
//   }

//   async sendOffer(data: {
//     calleeId: string;
//     [key: string]: any;
//   }): Promise<void> {
//     console.log("Looking up socket for calleeId:", data.calleeId);
//     const receiverSocketId = await this._socketUserMapRepository.getUserSocket(
//       data.calleeId,
//     );

//     if (receiverSocketId) {
//       console.log(`Found socket ${receiverSocketId}. Sending offer.`);
//       this._io.to(receiverSocketId).emit(VIDEO_CALL_EVENT.OFFER, data);
//     } else {
//       console.warn(
//         `Could not find socket for user ${data.calleeId}. User might be offline.`,
//       );
//     }
//   }

//   async sendAnswer(data: {
//     callerId: string;
//     [key: string]: any;
//   }): Promise<void> {
//     // ⭐️ CORRECTED LOGIC: Use callerId, not calleeId
//     console.log("Looking up socket for callerId:", data.callerId);
//     const receiverSocketId = await this._socketUserMapRepository.getUserSocket(
//       data.callerId,
//     );

//     if (receiverSocketId) {
//       console.log(`Found socket ${receiverSocketId}. Sending answer.`);
//       this._io.to(receiverSocketId).emit(VIDEO_CALL_EVENT.ANSWER, data);
//     } else {
//       console.warn(
//         `Could not find socket for user ${data.callerId}. User might be offline.`,
//       );
//     }
//   }

//   async sendCallRequest(data: { calleeId: string; callerId: string }) {
//     const receiverSocketId = await this._socketUserMapRepository.getUserSocket(
//       data.calleeId,
//     );
//     if (receiverSocketId) {
//       this._io.to(receiverSocketId).emit(VIDEO_CALL_EVENT.CALL_REQUEST, data);
//     }
//   }

//   async sendCallAccept(data: { callerId: string; calleeId: string }) {
//     const receiverSocketId = await this._socketUserMapRepository.getUserSocket(
//       data.callerId,
//     );
//     if (receiverSocketId) {
//       this._io.to(receiverSocketId).emit(VIDEO_CALL_EVENT.CALL_ACCEPT, data);
//     }
//   }

//   async sendCallReject(data: { callerId: string; calleeId: string }) {
//     const receiverSocketId = await this._socketUserMapRepository.getUserSocket(
//       data.callerId,
//     );
//     if (receiverSocketId) {
//       this._io.to(receiverSocketId).emit(VIDEO_CALL_EVENT.CALL_REJECT, data);
//     }
//   }

//   async sendHangup(data: { peerId: string }) {
//     const receiverSocketId = await this._socketUserMapRepository.getUserSocket(
//       data.peerId,
//     );
//     if (receiverSocketId) {
//       this._io.to(receiverSocketId).emit(VIDEO_CALL_EVENT.HANGUP, data);
//     }
//   }
// }

//..............
// frameworks/socket/handlers/SignallingHandler.ts
import { ISocketUserMapRepository } from "entities/repositoryInterfaces/redis/socket-user.repository";
import { ISignallingHandler } from "entities/socketHandlersInterfaces/ISignalling.handler.interface";
import { VIDEO_CALL_EVENT } from "shared/constants/constants";
import { Server, Socket } from "socket.io";
import { inject, injectable } from "tsyringe";

@injectable()
export class SignallingHandler implements ISignallingHandler {
  private _socket!: Socket;
  private _io!: Server;

  constructor(
    @inject("ISocketUserRepository")
    private _socketUserMapRepository: ISocketUserMapRepository,
  ) {}

  setSocket(socket: Socket, io: Server) {
    this._socket = socket;
    this._io = io;
  }

  private async emitToUser(userId: string, event: string, data: object) {
    const receiverSocketId =
      await this._socketUserMapRepository.getUserSocket(userId);
    if (receiverSocketId) {
      this._io.to(receiverSocketId).emit(event, data);
    } else {
      console.warn(`User ${userId} offline, cannot send ${event}`);
    }
  }

  // ---- New Call Control ----
  async sendCallRequest(data: { calleeId: string; callerId: string }) {
    await this.emitToUser(data.calleeId, VIDEO_CALL_EVENT.CALL_REQUEST, data);
  }

  async sendCallAccept(data: { callerId: string; calleeId: string }) {
    await this.emitToUser(data.callerId, VIDEO_CALL_EVENT.CALL_ACCEPT, data);
  }

  async sendCallReject(data: { callerId: string; calleeId: string }) {
    await this.emitToUser(data.callerId, VIDEO_CALL_EVENT.CALL_REJECT, data);
  }

  async sendCallEnd(data: { to: string; from: string }) {
    await this.emitToUser(data.to, VIDEO_CALL_EVENT.CALL_END, data);
  }

  // ---- WebRTC Signalling ----
  async sendCandidate(data: {
    receiverId: string;
    candidate: RTCIceCandidateInit;
  }) {
    await this.emitToUser(data.receiverId, VIDEO_CALL_EVENT.ICECANDIDATE, data);
  }

  async sendOffer(data: { calleeId: string; sdp: object; callerId: string }) {
    await this.emitToUser(data.calleeId, VIDEO_CALL_EVENT.OFFER, data);
  }

  async sendAnswer(data: { callerId: string; sdp: object; calleeId: string }) {
    await this.emitToUser(data.callerId, VIDEO_CALL_EVENT.ANSWER, data);
  }
}
