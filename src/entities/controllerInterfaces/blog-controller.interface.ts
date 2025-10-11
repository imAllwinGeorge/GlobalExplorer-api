import { NextFunction, Request, Response } from "express";

export interface IBlogController {
  createBlog(req: Request, res: Response, next: NextFunction): Promise<void>;
  getBlogs(req: Request, res: Response, next: NextFunction): Promise<void>;
  getMyBlogs(req: Request, res: Response, next: NextFunction): Promise<void>;
  editBlog(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteBlog(req: Request, res: Response, next: NextFunction): Promise<void>;
}
