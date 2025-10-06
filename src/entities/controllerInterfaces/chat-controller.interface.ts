import { Request, Response } from "express";

export interface IChatController {
  getAllConversation(req: Request, res: Response): Promise<void>;
  userSearch(req: Request, res: Response): Promise<void>;
  getMessages(req: Request, res: Response): Promise<void>;
  markReadMessage(req: Request, res: Response): Promise<void>;
}
