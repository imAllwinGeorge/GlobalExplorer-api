import { inject, injectable } from "tsyringe";
import { ISendDirectMessageUsecase } from "../../../entities/usecaseInterfaces/chat/direct-message/send-message.usecase.interface";
import { IMessageRepository } from "../../../entities/repositoryInterfaces/chat/IMessage.repository.interface";
import { IConversationRepository } from "../../../entities/repositoryInterfaces/chat/Conversation.repository.interface";
import { ConversationMapper } from "../../../shared/mappers/conversation.mapper";
import { MessageMapper } from "../../../shared/mappers/message.mapper";
import {
  ConversationResponseDTO,
  MessageResponseDTO,
} from "../../../shared/dtos/response.dto";

@injectable()
export class SendDirectMessageUsecase implements ISendDirectMessageUsecase {
  constructor(
    @inject("IMessageRepository")
    private _messageRepository: IMessageRepository,

    @inject("IConversationRepository")
    private _conversationRepository: IConversationRepository,

    @inject(ConversationMapper)
    private _conversationMapper: ConversationMapper,

    @inject(MessageMapper)
    private _messageMapper: MessageMapper,
  ) {}

  async execute(
    senderId: string,
    receiverId: string,
    content: string,
  ): Promise<{
    message: MessageResponseDTO;
    conversation: ConversationResponseDTO;
  }> {
    if (senderId === receiverId) throw new Error("Bad Request");

    const normalized = [senderId, receiverId].sort((a, b) =>
      a.toString().localeCompare(b.toString()),
    );

    let conversation =
      await this._conversationRepository.findByParticipants(normalized);

    if (!conversation) {
      conversation = await this._conversationRepository.save({
        participants: normalized,
        lastMessage: content,
        lastSender: senderId,
        lastMessageAt: new Date(),
        unreadCount: {
          [receiverId]: 1,
          [senderId]: 0,
        },
      });
    } else {
      conversation = await this._conversationRepository.updatemetadata(
        conversation._id,
        {
          lastMessage: content,
          lastSender: senderId,
          lastMessageAt: new Date(),
          $inc: { [`unreadCount.${receiverId}`]: 1 },
        },
      );
    }

    const message = await this._messageRepository.save({
      conversationId: conversation._id,
      senderId,
      receiverId,
      content,
      read: false,
    });

    const mappedConversation = this._conversationMapper.toDTO(conversation);
    const mappedMessage = this._messageMapper.toDTO(message);

    return { message: mappedMessage, conversation: mappedConversation };
  }
}
