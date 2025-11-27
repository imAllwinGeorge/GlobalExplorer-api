import { NextFunction, Request, Response } from "express";

export interface ISalesController {
  generateSalesDetails(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  generateHostSalesDetails(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  hostSalesReport(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  adminSalesReport(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  activitySalesReport(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
}
