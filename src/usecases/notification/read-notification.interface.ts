import { INotificationRepository } from "entities/repositoryInterfaces/notification/notificationRepository";
import { ISocketUserMapRepository } from "entities/repositoryInterfaces/redis/socket-user.repository";
import { IReadNotificationUsecase } from "entities/usecaseInterfaces/notification/read-notification.interface";
import { INotificationModel } from "frameworks/database/mongo/models/notification.model";
import { inject, injectable } from "tsyringe";

@injectable()
export class ReadNotificationUsecase implements IReadNotificationUsecase {
  constructor(
    @inject("INotificationRepository")
    private _notificationRepository: INotificationRepository,

    @inject("ISocketUserRepository")
    private _socketRepository: ISocketUserMapRepository,
  ) {}

  async execute(
    id: string,
    receiverId: string,
  ): Promise<{ notification: INotificationModel; socketId: string }> {
    const notification = await this._notificationRepository.findOneAndUpdate(
      { _id: id },
      { isRead: true },
    );
    if (!notification) throw new Error("Could not find the notification.");
    const socketId = await this._socketRepository.getUserSocket(receiverId);
    if (!socketId) throw new Error("Couldn't find socket Id");
    return { notification, socketId };
  }
}
