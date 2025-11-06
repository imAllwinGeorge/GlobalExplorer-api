import { NextFunction, Request, Response } from "express";

import { inject, injectable } from "tsyringe";
import { INotificationController } from "../../entities/controllerInterfaces/notification-controller.interface";
import { IGetNotificationUsecase } from "../../entities/usecaseInterfaces/notification/get-notification.interface";
import { HttpStatusCode } from "../../shared/constants/constants";
import { getPaginationParams } from "../../shared/utils/pagination.helper";

@injectable()
export class NotificationController implements INotificationController {
  constructor(
    @inject("IGetNotificationUsecase")
    private _getNotificationUsecase: IGetNotificationUsecase,
  ) {}

  async getNotifications(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const { limit, skip } = getPaginationParams(req);

      const result = await this._getNotificationUsecase.execute(
        limit,
        skip,
        userId,
      );

      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}
