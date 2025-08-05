import { IMessageModel } from "frameworks/database/mongo/models/message.model";

export interface IGetMessageUsecase {
  execute(conversationId: string): Promise<IMessageModel[]>;
}
