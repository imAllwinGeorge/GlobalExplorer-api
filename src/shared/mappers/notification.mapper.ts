import { INotificationMapper } from "../../entities/mapperInterfaces/notification-mapper.interface";
import { INotificationModel } from "../../frameworks/database/mongo/models/notification.model";
import { NotificationResponseDTO } from "../dtos/response.dto";

export class NotificationMapper implements INotificationMapper {
  toDTO(notifiction: INotificationModel): NotificationResponseDTO {
    return {
      _id: notifiction._id,
      userId: notifiction.userId,
      message: notifiction.message,
      type: notifiction.type,
      isRead: notifiction.isRead,
      createdAt: notifiction.createdAt,
      updatedAt: notifiction.updatedAt,
    };
  }

  toDTOs(entities: INotificationModel[]): NotificationResponseDTO[] {
    return entities.map((entity: INotificationModel) => this.toDTO(entity));
  }
}
