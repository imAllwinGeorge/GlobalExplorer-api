import { ISocketUserMapRepository } from "entities/repositoryInterfaces/redis/socket-user.repository";
import { INotificationService } from "entities/serviceInterfaces/notification-service.interface";
import { ISocketServices } from "entities/serviceInterfaces/socket.service";
import { inject, injectable } from "tsyringe";

@injectable()
export class NotificationService implements INotificationService {
  constructor(
    @inject("ISocketUserRepository")
    private _userSocketRepository: ISocketUserMapRepository,

    @inject("ISocketServices")
    private _socketService: ISocketServices,
  ) {}

  async emitNotification(
    userId: string,
    payload: object,
    event: string,
  ): Promise<void> {
    const socket = this._socketService.getIO();
    console.log("notification service socket: ", socket);
    const userSocketId = await this._userSocketRepository.getUserSocket(userId);

    if (userSocketId) {
      socket.to(userSocketId).emit(event, payload);
    }
  }
}
