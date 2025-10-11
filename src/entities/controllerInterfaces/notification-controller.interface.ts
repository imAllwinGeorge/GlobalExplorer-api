import { NextFunction, Request, Response } from "express";

export interface INotificationController {
  getNotifications(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
}
