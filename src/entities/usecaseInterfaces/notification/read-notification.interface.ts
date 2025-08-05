import { INotificationModel } from "frameworks/database/mongo/models/notification.model";

export interface IReadNotificationUsecase {
  execute(
    id: string,
    receiverId: string,
  ): Promise<{ notification: INotificationModel; socketId: string }>;
}
