import { Request, Response } from "express";

export interface ICategoryController {
  getCategories(req: Request, res: Response): Promise<void>;
  addCategory(req: Request, res: Response): Promise<void>;
  editCategory(req: Request, res: Response): Promise<void>;
  updateCategoryStatus(req: Request, res: Response): Promise<void>;
  getCategoryNames(req: Request, res: Response): Promise<void>;
}
