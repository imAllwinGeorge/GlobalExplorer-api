import { INotificationRepository } from "entities/repositoryInterfaces/notification/notificationRepository";
import { IGetNotificationUsecase } from "entities/usecaseInterfaces/notification/get-notification.interface";
import { INotificationModel } from "frameworks/database/mongo/models/notification.model";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetNotificationUsecase implements IGetNotificationUsecase {
  constructor(
    @inject("INotificationRepository")
    private _notificationRepository: INotificationRepository,
  ) {}

  async execute(userId: string): Promise<INotificationModel[]> {
    const notifications = await this._notificationRepository.find({ userId });

    return notifications;
  }
}
