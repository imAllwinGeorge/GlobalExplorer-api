import { IConversationModel } from "frameworks/database/mongo/models/conversation.model";
import { IMessageModel } from "frameworks/database/mongo/models/message.model";

export interface ISendDirectMessageUsecase {
  execute(
    senderId: string,
    receiverId: string,
    content: string,
  ): Promise<{ message: IMessageModel; conversation: IConversationModel }>;
}
