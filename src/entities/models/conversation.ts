import { IBaseEntitiy } from "./base.entity";

export interface IConversationEntity extends IBaseEntitiy {
  participants: string[];
  lastMessage: string;
  lastSender: string;
  lastMessageAt: Date;
  unreadCount: Record<string, number>;
}
