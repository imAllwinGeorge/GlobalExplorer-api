import { inject, injectable } from "tsyringe";
import { IGetNotificationUsecase } from "../../entities/usecaseInterfaces/notification/get-notification.interface";
import { INotificationRepository } from "../../entities/repositoryInterfaces/notification/notificationRepository";
import { NotificationResponseDTO } from "../../shared/dtos/response.dto";
import { INotificationMapper } from "../../entities/mapperInterfaces/notification-mapper.interface";
import { INotificationModel } from "../../frameworks/database/mongo/models/notification.model";

@injectable()
export class GetNotificationUsecase implements IGetNotificationUsecase {
  constructor(
    @inject("INotificationRepository")
    private _notificationRepository: INotificationRepository,

    @inject("INotificationMapper")
    private _notificationMapper: INotificationMapper,
  ) {}

  async execute(
    limit: number,
    skip: number,
    userId: string,
  ): Promise<{
    notifications: NotificationResponseDTO[];
    unreadCount: number;
  }> {
    const [notifications, unreadCount] = await Promise.all([
      this._notificationRepository.findAll(limit, skip, {
        userId,
      }),
      this._notificationRepository.countDocuments({ isRead: false }),
    ]);

    return {
      notifications: this._notificationMapper.toDTOs(
        notifications.items as INotificationModel[],
      ),
      unreadCount,
    };
  }
}
