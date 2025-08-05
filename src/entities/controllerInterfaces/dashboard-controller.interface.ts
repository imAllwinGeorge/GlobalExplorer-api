import { Request, Response } from "express";

export interface IDashboardController {
  adminDashboardController(req: Request, res: Response): Promise<void>;
  hostDashboardContrller(req: Request, res: Response): Promise<void>;
}
