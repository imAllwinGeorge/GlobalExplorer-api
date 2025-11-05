import { NotificationResponseDTO } from "../../../shared/dtos/response.dto";

export interface IGetNotificationUsecase {
  execute(
    limit: number,
    skip: number,
    userId: string,
  ): Promise<{
    notifications: NotificationResponseDTO[];
    unreadCount: number;
  }>;
}
