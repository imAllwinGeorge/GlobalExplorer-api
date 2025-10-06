// import { ISignallingHandler } from "entities/socketHandlersInterfaces/ISignalling.handler.interface";
// import { signallingHandler } from "frameworks/di/resolver";
// import { VIDEO_CALL_EVENT } from "shared/constants/constants";
// import { Server, Socket } from "socket.io";

// export class SignallingEvents {
//   private _handler: ISignallingHandler;

//   constructor(
//     private _socket: Socket,
//     private _io: Server,
//   ) {
//     this._handler = signallingHandler;
//     this._handler.setSocket(this._socket, this._io);
//   }

//   async register() {
//     console.log(
//       "video chat event triggered success: ",
//       VIDEO_CALL_EVENT.ICECANDIDATE,
//     );
//     this._socket.on(VIDEO_CALL_EVENT.ICECANDIDATE, (data) => {

//       this._handler.sendCandidate(data);
//     });

//     this._socket.on(VIDEO_CALL_EVENT.OFFER, (data) => {
//       this._handler.sendOffer(data);
//     });

//     this._socket.on(VIDEO_CALL_EVENT.ANSWER, (data) => {
//       this._handler.sendAnswer(data);
//     });
//   }
// }

// Signalling.events.ts
// import { Server, Socket } from "socket.io";
// import { VIDEO_CALL_EVENT } from "shared/constants/constants";
// import { ISignallingHandler } from "entities/socketHandlersInterfaces/ISignalling.handler.interface";
// import { signallingHandler } from "frameworks/di/resolver";

// export class SignallingEvents {
//   private _handler: ISignallingHandler;

//   constructor(
//     private _socket: Socket,
//     private _io: Server,
//   ) {
//     this._handler = signallingHandler;
//     this._handler.setSocket(this._socket, this._io);
//   }

//   register() {
//     this._socket.on(VIDEO_CALL_EVENT.ICECANDIDATE, (data) => {
//       // ✅ ADD THIS LOG
//       console.log("Received ICECANDIDATE data on server:", data);
//       this._handler.sendCandidate(data);
//     });

//     this._socket.on(VIDEO_CALL_EVENT.OFFER, (data) => {
//       // ✅ ADD THIS LOG
//       console.log("Received OFFER data on server:", data);
//       this._handler.sendOffer(data);
//     });

//     this._socket.on(VIDEO_CALL_EVENT.ANSWER, (data) => {
//       // ✅ ADD THIS LOG
//       console.log("Received ANSWER data on server:", data);
//       this._handler.sendAnswer(data);
//     });

//     this._socket.on(VIDEO_CALL_EVENT.CALL_REQUEST, (data) => {
//       console.log("event request.......");
//       this._handler.sendCallRequest(data);
//     });

//     this._socket.on(VIDEO_CALL_EVENT.CALL_ACCEPT, (data) => {
//       console.log("event accept....");
//       this._handler.sendCallAccept(data);
//     });

//     this._socket.on(VIDEO_CALL_EVENT.CALL_REJECT, (data) => {
//       console.log("event refect.");
//       this._handler.sendCallReject(data);
//     });

//     this._socket.on(VIDEO_CALL_EVENT.HANGUP, (data) => {
//       console.log("event hangup...........");
//       this._handler.sendHangup(data);
//     });
//   }
// }

///.......................

// interfaceAdapters/socket/events/Signalling.events.ts
import { Server, Socket } from "socket.io";
import { ISignallingHandler } from "../../../entities/socketHandlersInterfaces/ISignalling.handler.interface";
import { signallingHandler } from "../../../frameworks/di/resolver";
import { VIDEO_CALL_EVENT } from "../../../shared/constants/constants";

export class SignallingEvents {
  private _handler: ISignallingHandler;

  constructor(
    private _socket: Socket,
    private _io: Server,
  ) {
    this._handler = signallingHandler;
    this._handler.setSocket(this._socket, this._io);
  }

  register() {
    this._socket.on(VIDEO_CALL_EVENT.CALL_REQUEST, (data) =>
      this._handler.sendCallRequest(data),
    );
    this._socket.on(VIDEO_CALL_EVENT.CALL_ACCEPT, (data) =>
      this._handler.sendCallAccept(data),
    );
    this._socket.on(VIDEO_CALL_EVENT.CALL_REJECT, (data) =>
      this._handler.sendCallReject(data),
    );
    this._socket.on(VIDEO_CALL_EVENT.CALL_END, (data) =>
      this._handler.sendCallEnd(data),
    );

    this._socket.on(VIDEO_CALL_EVENT.OFFER, (data) =>
      this._handler.sendOffer(data),
    );
    this._socket.on(VIDEO_CALL_EVENT.ANSWER, (data) =>
      this._handler.sendAnswer(data),
    );
    this._socket.on(VIDEO_CALL_EVENT.ICECANDIDATE, (data) =>
      this._handler.sendCandidate(data),
    );
  }
}
