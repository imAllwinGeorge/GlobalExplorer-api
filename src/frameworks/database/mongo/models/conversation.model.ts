import { IConversationEntity } from "entities/models/conversation";
import { Document, model, ObjectId, Schema } from "mongoose";

export interface IConversationModel extends IConversationEntity, Document {
  _id: ObjectId;
}

const ConversationSchema = new Schema(
  {
    participants: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "User",
      validate: {
        validator: (v: Schema.Types.ObjectId[]) => v.length === 2,
        message: "A conversation must have excatly 2 participants",
      },
    },
    lastMessage: {
      type: String,
      required: true,
    },
    lastSender: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    lastMessageAt: {
      type: Date,
      required: true,
    },
    unreadCount: {
      type: Map,
      of: Number,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

ConversationSchema.index({ participants: 1, lastMessageAt: -1 });
export const ConversationModel = model<IConversationModel>(
  "Conversation",
  ConversationSchema,
);
