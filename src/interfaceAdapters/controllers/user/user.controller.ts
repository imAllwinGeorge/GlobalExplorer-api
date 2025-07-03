import { inject, injectable } from "tsyringe";
import { IUserControllerInterface } from "../../../entities/controllerInterfaces/users/user-controller.interface";
import { Request, Response } from "express";
import { IGetAllUsersUsecaseInterface } from "../../../entities/usecaseInterfaces/user/get-all-user.usecase.interface";
import { IUpdateStatusUsecaseInterface } from "../../../entities/usecaseInterfaces/user/update-status.usecase.interface";
import { IGetUserUsecaseInterface } from "entities/usecaseInterfaces/user/get-user.usecase.interface";

@injectable()
export class IUserController implements IUserControllerInterface {
  constructor(
    @inject("IGetAllUsersUsecase")
    private _getAllUsersUsecase: IGetAllUsersUsecaseInterface,

    @inject("IUpdateStatusUsecase")
    private _updateStatusUsecase: IUpdateStatusUsecaseInterface,

    @inject("IGetUserUsecase")
    private _getUserUsecase: IGetUserUsecaseInterface,
  ) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const { role } = req.params;
      const users = await this._getAllUsersUsecase.execute(role);
      res.status(200).json({ users });
      return;
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async updateStatus(req: Request, res: Response): Promise<void> {
    try {
      const { _id, value } = req.body;
      const { role } = req.params;
      console.log("update status controller ", _id, value, role);
      const user = await this._updateStatusUsecase.execute(_id, value, role);
      res.status(200).json({
        user,
        message: `${user.firstName} is ${user.isBlocked ? "Blocked" : "UnBlocked"}`,
      });
    } catch (error) {
      res.status(500).json({ message: error });
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
      res.status(200).json({ user });
    } catch (error) {
      console.log("get user details", error);
      res.status(500).json({ messge: error });
    }
  }
}
