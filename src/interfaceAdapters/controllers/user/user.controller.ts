import { inject, injectable } from "tsyringe";
import { IUserController } from "../../../entities/controllerInterfaces/users/user-controller.interface";
import { NextFunction, Request, Response } from "express";
import { IGetAllUsersUsecase } from "../../../entities/usecaseInterfaces/user/get-all-user.usecase.interface";
import { IUpdateStatusUsecase } from "../../../entities/usecaseInterfaces/user/update-status.usecase.interface";
import { IGetUserUsecase } from "../../../entities/usecaseInterfaces/user/get-user.usecase.interface";
import {
  calculateTotalPages,
  getPaginationParams,
} from "../../../shared/utils/pagination.helper";
import { HttpStatusCode, ROLE } from "../../../shared/constants/constants";
import { userEditSchema } from "../auth/validations/user-signup.validatiion.schema";

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

  async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { role } = req.params;
      const { search, filter } = req.query;
      const { limit, skip } = getPaginationParams(req);
      const result = await this._getAllUsersUsecase.execute(
        limit,
        skip,
        role,
        search as string,
        filter as string,
      );
      const totalPages = calculateTotalPages(result.total, limit);
      res.status(HttpStatusCode.OK).json({ users: result.items, totalPages });
      return;
    } catch (error) {
      // res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error });
      next(error);
    }
  }

  async editProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.params.id;
      const parsedData = userEditSchema.parse(req.body);

      const updatedUser = await this._updateStatusUsecase.execute(
        userId,
        parsedData,
        ROLE.USER,
      );

      res.status(HttpStatusCode.OK).json({ user: updatedUser });
    } catch (error) {
      next(error);
    }
  }
  async updateStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId, value } = req.body;
      const { role } = req.params;
      const user = await this._updateStatusUsecase.execute(userId, value, role);
      res.status(HttpStatusCode.OK).json({
        user,
        message: `${user.firstName} is ${user.isBlocked ? "Blocked" : "UnBlocked"}`,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId, role } = req.query;
      const user = await this._getUserUsecase.execute(
        userId as string,
        role as string,
      );
      res.status(HttpStatusCode.OK).json({ user });
    } catch (error) {
      next(error);
    }
  }
}
