import { Request, Response } from "express";

export interface IAuthController {
  send_otp(req: Request, res: Response): Promise<void>;
  resend_otp(req: Request, res: Response): Promise<void>;
  register(req: Request, res: Response): Promise<void>;
  login(req: Request, res: Response): Promise<void>;
  forgotPassword(req: Request, res: Response): Promise<void>;
  resetPassword(req: Request, res: Response): Promise<void>;
  verifyToken(req: Request, res: Response): Promise<void>;
  googleLogin(req: Request, res: Response): Promise<void>;
}
