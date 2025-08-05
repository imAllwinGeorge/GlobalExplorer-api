import { INotificationModel } from "frameworks/database/mongo/models/notification.model";

export interface IGetNotificationUsecase {
  execute(userId: string): Promise<INotificationModel[]>;
}
