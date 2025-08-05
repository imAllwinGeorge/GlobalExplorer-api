import { INotificationModel } from "frameworks/database/mongo/models/notification.model";
import { IBaseRepository } from "../IBaseRepository.interface";

export type INotificationRepository = IBaseRepository<INotificationModel>;
