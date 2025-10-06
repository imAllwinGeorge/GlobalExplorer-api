import { Document, model, ObjectId, Schema, Types } from "mongoose";
import { IMessageEntitiy } from "../../../../entities/models/message";

export interface IMessageModel extends IMessageEntitiy, Document {
  _id: ObjectId;
}

const MessageSchema = new Schema(
  {
    conversationId: {
      type: Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    senderId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
      required: true,
    },
    sentAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

MessageSchema.index({ conversationId: 1, sentAt: -1 });
MessageSchema.index({ receiverId: 1, read: 1 });
export const MessageModel = model<IMessageModel>("Message", MessageSchema);
