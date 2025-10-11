import { NextFunction, Request, Response } from "express";

export interface ICategoryController {
  getCategories(req: Request, res: Response, next: NextFunction): Promise<void>;
  addCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
  editCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateCategoryStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  getCategoryNames(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
}
