import { inject, injectable } from "tsyringe";
import { IMarkReadMessageUsecase } from "../../../entities/usecaseInterfaces/chat/direct-message/mark-read-message.usecase.interface";
import { IConversationRepository } from "../../../entities/repositoryInterfaces/chat/Conversation.repository.interface";
import { ConversationMapper } from "../../../shared/mappers/conversation.mapper";
import { ConversationResponseDTO } from "../../../shared/dtos/response.dto";

@injectable()
export class MarkReadMessageUsecase implements IMarkReadMessageUsecase {
  constructor(
    @inject("IConversationRepository")
    private _conversationRepository: IConversationRepository,

    @inject(ConversationMapper)
    private _conversationMapper: ConversationMapper,
  ) {}

  async execute(
    conversationId: string,
    userId: string,
  ): Promise<ConversationResponseDTO> {
    const updateField = `unreadCount.${userId}`;

    const conversation = await this._conversationRepository.findOneAndUpdate(
      { _id: conversationId },
      { [updateField]: 0 },
    );

    if (!conversation) throw new Error("Failed to fetch the conversation.");

    return this._conversationMapper.toDTO(conversation);
  }
}
