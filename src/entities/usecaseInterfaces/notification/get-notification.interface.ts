import { NotificationResponseDTO } from "../../../shared/dtos/response.dto";

export interface IGetNotificationUsecase {
  execute(userId: string): Promise<NotificationResponseDTO[]>;
}
