import { INotificationModel } from "../../frameworks/database/mongo/models/notification.model";
import { NotificationResponseDTO } from "../../shared/dtos/response.dto";

export interface INotificationMapper {
  toDTO(notification: INotificationModel): NotificationResponseDTO;
  toDTOs(entities: INotificationModel[]): NotificationResponseDTO[];
}
