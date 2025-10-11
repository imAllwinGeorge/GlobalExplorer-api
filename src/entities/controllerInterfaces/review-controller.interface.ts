import { NextFunction, Request, Response } from "express";

export interface IReviewController {
  writeReview(req: Request, res: Response, next: NextFunction): Promise<void>;
}
