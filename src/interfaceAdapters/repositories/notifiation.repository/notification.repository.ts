import {
  INotificationModel,
  NotificationModel,
} from "frameworks/database/mongo/models/notification.model";
import { BaseRepository } from "../base.repository";
import { INotificationRepository } from "entities/repositoryInterfaces/notification/notificationRepository";
import { injectable } from "tsyringe";

@injectable()
export class NotificationRepository
  extends BaseRepository<INotificationModel>
  implements INotificationRepository
{
  constructor() {
    super(NotificationModel);
  }
}
