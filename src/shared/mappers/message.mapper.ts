import { IMessageModel } from "../../frameworks/database/mongo/models/message.model";
import { MessageResponseDTO } from "../dtos/response.dto";

export class MessageMapper {
  toDTO(message: IMessageModel): MessageResponseDTO {
    return {
      _id: message._id,
      conversationId: message.conversationId,
      senderId: message.senderId,
      receiverId: message.receiverId,
      content: message.content,
      read: message.read,
      sentAt: message.sentAt,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
    };
  }

  toDTOs(entities: IMessageModel[]): MessageResponseDTO[] {
    return entities.map((entity) => this.toDTO(entity));
  }
}
