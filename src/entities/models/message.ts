import { ObjectId } from "mongoose";
import { IBaseEntitiy } from "./base.entity";

export interface IMessageEntitiy extends IBaseEntitiy {
  conversationId: string | ObjectId;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  sentAt: Date;
}
