import { IConversationRepository } from "entities/repositoryInterfaces/chat/Conversation.repository.interface";
import { IMarkReadMessageUsecase } from "entities/usecaseInterfaces/chat/direct-message/mark-read-message.usecase.interface";
import { IConversationModel } from "frameworks/database/mongo/models/conversation.model";
import { inject, injectable } from "tsyringe";

@injectable()
export class MarkReadMessageUsecase implements IMarkReadMessageUsecase {
  constructor(
    @inject("IConversationRepository")
    private _conversationRepository: IConversationRepository,
  ) {}

  async execute(
    conversationId: string,
    userId: string,
  ): Promise<IConversationModel> {
    const updateField = `unreadCount.${userId}`;
    const conversation = await this._conversationRepository.findOneAndUpdate(
      { _id: conversationId },
      { [updateField]: 0 },
    );
    if (!conversation) throw new Error("Failed to fetch the conversation.");
    return conversation;
  }
}
