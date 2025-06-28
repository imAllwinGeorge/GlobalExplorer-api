import { inject, injectable } from "tsyringe";
import { IUserControllerInterface } from "../../../entities/controllerInterfaces/users/user-controller.interface";
import { Request, Response } from "express";
import { IGetAllUsersUsecaseInterface } from "../../../entities/usecaseInterfaces/user/get-all-user.usecase.interface";
import { IUpdateStatusUsecaseInterface } from "../../../entities/usecaseInterfaces/user/update-status.usecase.interface";

@injectable()
export class IUserController implements IUserControllerInterface {
  constructor(
    @inject("IGetAllUsersUsecase")
    private _getAllUsersUsecase: IGetAllUsersUsecaseInterface,

    @inject("IUpdateStatusUsecase")
    private _updateStatusUsecase: IUpdateStatusUsecaseInterface,
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
      console.log("update status controller ", _id, value);
      const user = await this._updateStatusUsecase.execute(_id, value);
      res.status(200).json({
        user,
        message: `${user.firstName} is ${user.isBlocked ? "Blocked" : "UnBlocked"}`,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
