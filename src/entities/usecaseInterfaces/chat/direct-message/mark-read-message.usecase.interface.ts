import { IConversationModel } from "frameworks/database/mongo/models/conversation.model";

export interface IMarkReadMessageUsecase {
  execute(conversationId: string, userId: string): Promise<IConversationModel>;
}
