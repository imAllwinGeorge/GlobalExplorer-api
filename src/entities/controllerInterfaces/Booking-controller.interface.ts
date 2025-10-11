import { NextFunction, Request, Response } from "express";

export interface IBookingController {
  // bookActivity(req: Request, res: Response): Promise<void>;
  createRazorpayOrder(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  verifyPayment(req: Request, res: Response, next: NextFunction): Promise<void>;
  getBookings(req: Request, res: Response, next: NextFunction): Promise<void>;
  cancelBooking(req: Request, res: Response, next: NextFunction): Promise<void>;
  getActivityBookings(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  getBooking(req: Request, res: Response, next: NextFunction): Promise<void>;
}
