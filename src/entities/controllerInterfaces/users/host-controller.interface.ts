import { NextFunction, Request, Response } from "express";

export interface IHostController {
  editProfile(req: Request, res: Response, next: NextFunction): Promise<void>;
  getActivity(req: Request, res: Response, next: NextFunction): Promise<void>;
  getCategories(req: Request, res: Response, next: NextFunction): Promise<void>;
  addActivity(req: Request, res: Response, next: NextFunction): Promise<void>;
}
