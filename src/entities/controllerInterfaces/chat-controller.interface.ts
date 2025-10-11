import { NextFunction, Request, Response } from "express";

export interface IChatController {
  getAllConversation(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  userSearch(req: Request, res: Response, next: NextFunction): Promise<void>;
  getMessages(req: Request, res: Response, next: NextFunction): Promise<void>;
  markReadMessage(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
}
