import { IConversationModel } from "../../frameworks/database/mongo/models/conversation.model";
import { ConversationResponseDTO } from "../dtos/response.dto";
import { ConversationResponse } from "../types/types";

export class ConversationMapper {
  toDTO(conversation: IConversationModel): ConversationResponseDTO {
    return {
      _id: conversation._id,
      participants: conversation.participants,
      lastMessage: conversation.lastMessage,
      lastSender: conversation.lastSender,
      lastMessageAt: conversation.lastMessageAt,
      unreadCount: conversation.unreadCount,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
    };
  }

  toDTOs(
    entities: IConversationModel[],
    userMap: Map<
      string,
      {
        _id: string;
        firstName: string;
        lastName: string;
      }
    >,
    selfUserId: string,
  ): ConversationResponse[] {
    return entities.map((entity) => {
      const otherId = entity.participants.find(
        (id) => id.toString() !== selfUserId,
      );

      const user = otherId ? userMap.get(otherId.toString()) : null;
      const unreadCountObj =
        entity.unreadCount instanceof Map
          ? Object.fromEntries(entity.unreadCount)
          : entity.unreadCount;

      return {
        ...entity.toObject(),
        unreadCount: unreadCountObj,
        receiverId: user?._id,
        firstName: user?.firstName,
        lastName: user?.lastName,
      };
    });
  }
}
