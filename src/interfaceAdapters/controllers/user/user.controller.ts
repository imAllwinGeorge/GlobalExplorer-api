import { inject, injectable } from "tsyringe";
import { IUserController } from "../../../entities/controllerInterfaces/users/user-controller.interface";
import { Request, Response } from "express";
import { IGetAllUsersUsecase } from "../../../entities/usecaseInterfaces/user/get-all-user.usecase.interface";
import { IUpdateStatusUsecase } from "../../../entities/usecaseInterfaces/user/update-status.usecase.interface";
import { IGetUserUsecase } from "entities/usecaseInterfaces/user/get-user.usecase.interface";
import { HttpStatusCode } from "shared/constants/constants";

@injectable()
export class UserController implements IUserController {
  constructor(
    @inject("IGetAllUsersUsecase")
    private _getAllUsersUsecase: IGetAllUsersUsecase,

    @inject("IUpdateStatusUsecase")
    private _updateStatusUsecase: IUpdateStatusUsecase,

    @inject("IGetUserUsecase")
    private _getUserUsecase: IGetUserUsecase,
  ) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const { role } = req.params;
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const skip = (page - 1) * limit;
      const result = await this._getAllUsersUsecase.execute(limit, skip, role);
      const totalPages = Math.ceil(result.total / limit);
      res.status(HttpStatusCode.OK).json({ users: result.items, totalPages });
      return;
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }

  async updateStatus(req: Request, res: Response): Promise<void> {
    try {
      const { _id, value } = req.body;
      const { role } = req.params;
      console.log("update status controller ", _id, value, role);
      const user = await this._updateStatusUsecase.execute(_id, value, role);
      res.status(HttpStatusCode.OK).json({
        user,
        message: `${user.firstName} is ${user.isBlocked ? "Blocked" : "UnBlocked"}`,
      });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const { _id, role } = req.query;
      console.log(_id, role);
      const user = await this._getUserUsecase.execute(
        _id as string,
        role as string,
      );
      res.status(HttpStatusCode.OK).json({ user });
    } catch (error) {
      console.log("get user details", error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ messge: error });
    }
  }
}
