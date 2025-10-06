import { inject, injectable } from "tsyringe";
import { IReadNotificationUsecase } from "../../entities/usecaseInterfaces/notification/read-notification.interface";
import { INotificationRepository } from "../../entities/repositoryInterfaces/notification/notificationRepository";
import { ISocketUserMapRepository } from "../../entities/repositoryInterfaces/redis/socket-user.repository";
import { NotificationMapper } from "../../shared/mappers/notification.mapper";
import { NotificationResponseDTO } from "../../shared/dtos/response.dto";

@injectable()
export class ReadNotificationUsecase implements IReadNotificationUsecase {
  constructor(
    @inject("INotificationRepository")
    private _notificationRepository: INotificationRepository,

    @inject("ISocketUserRepository")
    private _socketRepository: ISocketUserMapRepository,

    @inject(NotificationMapper)
    private _notifcationMapper: NotificationMapper,
  ) {}

  async execute(
    id: string,
    receiverId: string,
  ): Promise<{ notification: NotificationResponseDTO; socketId: string }> {
    const notification = await this._notificationRepository.findOneAndUpdate(
      { _id: id },
      { isRead: true },
    );

    if (!notification) throw new Error("Could not find the notification.");

    const socketId = await this._socketRepository.getUserSocket(receiverId);

    if (!socketId) throw new Error("Couldn't find socket Id");

    const mappedNotfication = this._notifcationMapper.toDTO(notification);

    return { notification: mappedNotfication, socketId };
  }
}
