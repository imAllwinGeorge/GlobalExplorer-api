import { NextFunction, Request, Response } from "express";

export interface IUserController {
  getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
  getUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}
