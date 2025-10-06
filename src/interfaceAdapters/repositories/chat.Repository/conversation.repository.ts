import { BaseRepository } from "../base.repository";
import { injectable } from "tsyringe";
import { ObjectId } from "mongoose";
import {
  ConversationModel,
  IConversationModel,
} from "../../../frameworks/database/mongo/models/conversation.model";
import { IConversationRepository } from "../../../entities/repositoryInterfaces/chat/Conversation.repository.interface";

@injectable()
export class ConversationRepository
  extends BaseRepository<IConversationModel>
  implements IConversationRepository
{
  constructor() {
    super(ConversationModel);
  }

  async findByParticipants(
    participants: string[],
  ): Promise<IConversationModel | null> {
    return this.model.findOne({ participants });
  }

  async findAllConverations(id: string): Promise<IConversationModel[]> {
    return this.model.find({ participants: { $in: [id] } });
  }

  async updatemetadata(
    conversationId: string | ObjectId,
    updates: {
      lastMessage: string;
      lastSender: string;
      lastMessageAt: Date;
      $inc?: Record<string, number>;
    },
  ): Promise<IConversationModel> {
    const updatePayload: Record<string, string | Date> = {
      lastMessage: updates.lastMessage,
      lastMessageAt: updates.lastMessageAt,
      lastSender: updates.lastSender,
    };

    const updateOps: Record<string, Record<string, number | string | Date>> = {
      $set: updatePayload,
    };
    if (updates.$inc) {
      updateOps.$inc = updates.$inc;
    }
    const conversation = await this.model.findByIdAndUpdate(
      conversationId,
      updateOps,
      { new: true },
    );

    if (!conversation) throw new Error(" Error fetching the conversation");

    return conversation;
  }
}
