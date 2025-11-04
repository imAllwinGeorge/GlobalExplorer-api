import { inject, injectable } from "tsyringe";
import { IGetNotificationUsecase } from "../../entities/usecaseInterfaces/notification/get-notification.interface";
import { INotificationRepository } from "../../entities/repositoryInterfaces/notification/notificationRepository";
import { NotificationResponseDTO } from "../../shared/dtos/response.dto";
import { INotificationMapper } from "../../entities/mapperInterfaces/notification-mapper.interface";

@injectable()
export class GetNotificationUsecase implements IGetNotificationUsecase {
  constructor(
    @inject("INotificationRepository")
    private _notificationRepository: INotificationRepository,

    @inject("INotificationMapper")
    private _notificationMapper: INotificationMapper,
  ) {}

  async execute(userId: string): Promise<NotificationResponseDTO[]> {
    const notifications = await this._notificationRepository.find({ userId });

    return this._notificationMapper.toDTOs(notifications);
  }
}
