import { Request, Response } from "express";

export interface IUserControllerInterface {
  getAllUsers(req: Request, res: Response): Promise<void>;
  updateStatus(req: Request, res: Response): Promise<void>;
  getUser(req: Request, res: Response): Promise<void>;
}
