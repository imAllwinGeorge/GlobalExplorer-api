import { ObjectId } from "mongoose";

export interface IMessageEntitiy {
  conversationId: string | ObjectId;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  sentAt: Date;
}
