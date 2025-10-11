import { NextFunction, Request, Response } from "express";

export interface IDashboardController {
  adminDashboardController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  hostDashboardContrller(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
}
