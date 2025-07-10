import { Request, Response } from "express";

export interface IBlogControllerInterface {
  createBlog(req: Request, res: Response): Promise<void>;
  getBlogs(req: Request, res: Response): Promise<void>;
}
