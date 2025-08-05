import { INotificationController } from "entities/controllerInterfaces/notification-controller.interface";
import { IGetNotificationUsecase } from "entities/usecaseInterfaces/notification/get-notification.interface";
import { Request, Response } from "express";
import { HttpStatusCode } from "shared/constants/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class NotificationController implements INotificationController {
  constructor(
    @inject("IGetNotificationUsecase")
    private _getNotificationUsecase: IGetNotificationUsecase,
  ) {}

  async getNotifications(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const notifications = await this._getNotificationUsecase.execute(userId);
      res.status(HttpStatusCode.OK).json({ notifications });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
        return;
      }
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }
}
