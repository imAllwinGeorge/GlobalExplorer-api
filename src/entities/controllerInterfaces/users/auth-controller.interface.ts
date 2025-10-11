import { NextFunction, Request, Response } from "express";

export interface IAuthController {
  send_otp(req: Request, res: Response, next: NextFunction): Promise<void>;
  resend_otp(req: Request, res: Response, next: NextFunction): Promise<void>;
  register(req: Request, res: Response, next: NextFunction): Promise<void>;
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
  forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  resetPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
  verifyToken(req: Request, res: Response, next: NextFunction): Promise<void>;
  refreshToken(req: Request, res: Response, next: NextFunction): Promise<void>;
  googleLogin(req: Request, res: Response, next: NextFunction): Promise<void>;
  logout(req: Request, res: Response, next: NextFunction): Promise<void>;
  getProfile(req: Request, res: Response, next: NextFunction): Promise<void>;
}
