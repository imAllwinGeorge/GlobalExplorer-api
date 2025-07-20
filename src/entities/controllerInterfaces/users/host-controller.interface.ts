import { Request, Response } from "express";

export interface IHostControllerInterface {
  editProfile(req: Request, res: Response): Promise<void>;
  getActivity(req: Request, res: Response): Promise<void>;
  getCategories(req: Request, res: Response): Promise<void>;
  addActivity(req: Request, res: Response): Promise<void>;
}
