import { IConversationRepository } from "entities/repositoryInterfaces/chat/Conversation.repository.interface";
import { IMessageRepository } from "entities/repositoryInterfaces/chat/IMessage.repository.interface";
import { ISendDirectMessageUsecase } from "entities/usecaseInterfaces/chat/direct-message/send-message.usecase.interface";
import { IConversationModel } from "frameworks/database/mongo/models/conversation.model";
import { IMessageModel } from "frameworks/database/mongo/models/message.model";
import { inject, injectable } from "tsyringe";

@injectable()
export class SendDirectMessageUsecase implements ISendDirectMessageUsecase {
  constructor(
    @inject("IMessageRepository")
    private _messageRepository: IMessageRepository,

    @inject("IConversationRepository")
    private _conversationRepository: IConversationRepository,
  ) {}

  async execute(
    senderId: string,
    receiverId: string,
    content: string,
  ): Promise<{ message: IMessageModel; conversation: IConversationModel }> {
    console.log(senderId, receiverId, content);
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

    return { message, conversation };
  }
}
