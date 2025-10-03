import { Request, Response } from "express";

export interface IReviewController {
  writeReview(req: Request, res: Response): Promise<void>;
}
