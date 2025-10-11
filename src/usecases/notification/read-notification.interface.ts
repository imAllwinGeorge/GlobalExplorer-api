import { inject, injectable } from "tsyringe";
import { IReadNotificationUsecase } from "../../entities/usecaseInterfaces/notification/read-notification.interface";
import { INotificationRepository } from "../../entities/repositoryInterfaces/notification/notificationRepository";
import { ISocketUserMapRepository } from "../../entities/repositoryInterfaces/redis/socket-user.repository";
import { NotificationMapper } from "../../shared/mappers/notification.mapper";
import { NotificationResponseDTO } from "../../shared/dtos/response.dto";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";

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

    if (!notification)
      throw new AppError(
        "Could not find the notification.",
        HttpStatusCode.NOT_FOUND,
      );

    const socketId = await this._socketRepository.getUserSocket(receiverId);

    if (!socketId)
      throw new AppError("Couldn't find socket Id", HttpStatusCode.NOT_FOUND);

    const mappedNotfication = this._notifcationMapper.toDTO(notification);

    return { notification: mappedNotfication, socketId };
  }
}
