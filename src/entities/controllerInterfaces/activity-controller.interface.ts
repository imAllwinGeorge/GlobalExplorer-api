import { Request, Response } from "express";

export interface IActivityControllerInterface {
  addActivity(req: Request, res: Response): Promise<void>;
  editActivity(req: Request, res: Response): Promise<void>;
  updateActivity(req: Request, res: Response): Promise<void>;
  getAllActivities(req: Request, res: Response): Promise<void>;
}
