import { Request, Response } from "express";

export interface IBookingController {
  // bookActivity(req: Request, res: Response): Promise<void>;
  createRazorpayOrder(req: Request, res: Response): Promise<void>;
  verifyPayment(req: Request, res: Response): Promise<void>;
  getBookings(req: Request, res: Response): Promise<void>;
  cancelBooking(req: Request, res: Response): Promise<void>;
  getActivityBookings(req: Request, res: Response): Promise<void>;
}
