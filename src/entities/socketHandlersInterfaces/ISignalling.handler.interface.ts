import { Server, Socket } from "socket.io";

export interface ISignallingHandler {
  setSocket(socket: Socket, io: Server): void;
  sendCandidate(data: {
    receiverId: string;
    candidate: RTCIceCandidateInit;
  }): Promise<void>;
  sendOffer(data: {
    calleeId: string;
    sdp: object;
    callerId: string;
  }): Promise<void>;
  sendAnswer(data: {
    callerId: string;
    sdp: object;
    calleeId: string;
  }): Promise<void>;
  sendCallRequest(data: { calleeId: string; callerId: string }): Promise<void>;
  sendCallAccept(data: { callerId: string; calleeId: string }): Promise<void>;
  sendCallReject(data: { callerId: string; calleeId: string }): Promise<void>;
  sendCallEnd(data: { to: string; from: string }): Promise<void>;
  // sendHangup(data): Promise<void>;
}
