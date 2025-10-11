import { NextFunction, Request, Response } from "express";

export interface IActivityController {
  addActivity(req: Request, res: Response, next: NextFunction): Promise<void>;
  editActivity(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateActivity(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  getAllActivities(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  getActivityDetails(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  getFilteredActivity(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
}
