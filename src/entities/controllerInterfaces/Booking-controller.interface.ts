import { Request, Response } from "express";

export interface IBookingControllerInterface {
  // bookActivity(req: Request, res: Response): Promise<void>;
  createRazorpayOrder(req: Request, res: Response): Promise<void>;
  verifyPayment(req: Request, res: Response): Promise<void>;
}
