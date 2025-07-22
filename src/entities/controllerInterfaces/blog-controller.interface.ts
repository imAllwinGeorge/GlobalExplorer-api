import { Request, Response } from "express";

export interface IBlogController {
  createBlog(req: Request, res: Response): Promise<void>;
  getBlogs(req: Request, res: Response): Promise<void>;
  getMyBlogs(req: Request, res: Response): Promise<void>;
  editBlog(req: Request, res: Response): Promise<void>;
}
