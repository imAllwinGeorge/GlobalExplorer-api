import { inject, injectable } from "tsyringe";
import { IGetNotificationUsecase } from "../../entities/usecaseInterfaces/notification/get-notification.interface";
import { INotificationRepository } from "../../entities/repositoryInterfaces/notification/notificationRepository";
import { NotificationMapper } from "../../shared/mappers/notification.mapper";
import { NotificationResponseDTO } from "../../shared/dtos/response.dto";

@injectable()
export class GetNotificationUsecase implements IGetNotificationUsecase {
  constructor(
    @inject("INotificationRepository")
    private _notificationRepository: INotificationRepository,

    @inject(NotificationMapper)
    private _notificationMapper: NotificationMapper,
  ) {}

  async execute(userId: string): Promise<NotificationResponseDTO[]> {
    const notifications = await this._notificationRepository.find({ userId });

    return this._notificationMapper.toDTOs(notifications);
  }
}
