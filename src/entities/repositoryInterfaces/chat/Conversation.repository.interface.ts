import { IConversationModel } from "../../../frameworks/database/mongo/models/conversation.model";
import { IBaseRepository } from "../IBaseRepository.interface";
import { ObjectId } from "mongoose";

export interface IConversationRepository
  extends IBaseRepository<IConversationModel> {
  findByParticipants(
    participantArray: string[],
  ): Promise<IConversationModel | null>;

  findAllConverations(id: string): Promise<IConversationModel[]>;

  updatemetadata(
    conversationId: string | ObjectId,
    updates: {
      lastMessage: string;
      lastSender: string;
      lastMessageAt: Date;
      $inc?: Record<string, number>;
    },
  ): Promise<IConversationModel>;
}

// export type IConversationRepository = IBaseRepository<IConversationModel>;
