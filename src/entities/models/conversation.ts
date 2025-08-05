export interface IConversationEntity {
  participants: string[];
  lastMessage: string;
  lastSender: string;
  lastMessageAt: Date;
  unreadCount: Record<string, number>;
}
