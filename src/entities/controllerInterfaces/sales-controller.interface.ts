import { NextFunction, Request, Response } from "express";

export interface ISalesController {
  generateSalesReport(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  generateHostSalesReport(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
}
