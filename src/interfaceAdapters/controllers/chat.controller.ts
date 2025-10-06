import { HttpStatusCode } from "axios";

import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IChatController } from "../../entities/controllerInterfaces/chat-controller.interface";
import { IGetConversationUsecase } from "../../entities/usecaseInterfaces/chat/direct-message/get-conversation.usecase.interface";
import { IUserSearchUsecase } from "../../entities/usecaseInterfaces/chat/direct-message/user-search.usecase.interface";
import { IGetMessageUsecase } from "../../entities/usecaseInterfaces/chat/direct-message/get-message.usecase.interface";
import { IMarkReadMessageUsecase } from "../../entities/usecaseInterfaces/chat/direct-message/mark-read-message.usecase.interface";

@injectable()
export class ChatController implements IChatController {
  constructor(
    @inject("IGetConversationUsecase")
    private _getConversationUsecase: IGetConversationUsecase,

    @inject("IUserSearchUsecase")
    private _userSearchUsecase: IUserSearchUsecase,

    @inject("IGetMessageUsecase")
    private _getMessageUsecase: IGetMessageUsecase,

    @inject("IMarkReadMessageUsecase")
    private _markReadMessageUsecase: IMarkReadMessageUsecase,
  ) {}
  async getAllConversation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const conversations = await this._getConversationUsecase.execute(id);

      res.status(HttpStatusCode.Ok).json({ conversations });
    } catch (error) {
      if (error instanceof Error) {
        res.status(HttpStatusCode.BadRequest).json({ message: error.message });
        return;
      }

      res
        .status(HttpStatusCode.InternalServerError)
        .json({ message: "Internal Server Error" });
    }
  }

  async userSearch(req: Request, res: Response): Promise<void> {
    try {
      const { search } = req.params;

      const userSearch = await this._userSearchUsecase.execute(search);

      res.status(HttpStatusCode.Ok).json({ userSearch });
    } catch (error) {
      if (error instanceof Error) {
        res.status(HttpStatusCode.BadRequest).json({ message: error.message });
        return;
      }

      res
        .status(HttpStatusCode.InternalServerError)
        .json({ message: "Internal Server Error." });
    }
  }

  async getMessages(req: Request, res: Response): Promise<void> {
    try {
      const { conversationId } = req.params;
      const messages = await this._getMessageUsecase.execute(conversationId);

      res.status(HttpStatusCode.Ok).json({ messages });
    } catch (error) {
      if (error instanceof Error) {
        res.status(HttpStatusCode.BadRequest).json({ message: error.message });
        return;
      }

      res
        .status(HttpStatusCode.InternalServerError)
        .json({ message: "Internal Server Error." });
    }
  }

  async markReadMessage(req: Request, res: Response): Promise<void> {
    try {
      const { userId, conversationId } = req.params;

      const conversation = await this._markReadMessageUsecase.execute(
        conversationId,
        userId,
      );

      res.status(HttpStatusCode.Ok).json({ conversation });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(HttpStatusCode.BadRequest).json({ message: error.message });
        return;
      }

      res
        .status(HttpStatusCode.InternalServerError)
        .json({ message: "Internal Server Error" });
    }
  }
}
