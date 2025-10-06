import { Document, model, ObjectId, Schema } from "mongoose";
import { INotificationEntitiy } from "../../../../entities/models/notification.entity";

export interface INotificationModel extends INotificationEntitiy, Document {
  _id: ObjectId;
}

const notificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    message: {
      type: String,
      reqiured: true,
    },
    type: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const NotificationModel = model<INotificationModel>(
  "Notification",
  notificationSchema,
);
