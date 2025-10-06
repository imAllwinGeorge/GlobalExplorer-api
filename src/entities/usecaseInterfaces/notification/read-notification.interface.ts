import { NotificationResponseDTO } from "../../../shared/dtos/response.dto";

export interface IReadNotificationUsecase {
  execute(
    id: string,
    receiverId: string,
  ): Promise<{ notification: NotificationResponseDTO; socketId: string }>;
}
