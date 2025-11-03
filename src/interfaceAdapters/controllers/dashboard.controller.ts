import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IDashboardController } from "../../entities/controllerInterfaces/dashboard-controller.interface";
import { IAdminDashboardUsecase } from "../../entities/usecaseInterfaces/dashboard/admin-dashboard.interface";
import { IHostDashboardUsecase } from "../../entities/usecaseInterfaces/dashboard/host-dashboard.interface";
import { IUserHomeUsecase } from "../../entities/usecaseInterfaces/dashboard/user-home.interface";
import {
  calculateTotalPages,
  getPaginationParams,
} from "../../shared/utils/pagination.helper";

@injectable()
export class DashBoardController implements IDashboardController {
  constructor(
    @inject("IAdminDashboardUsecase")
    private _adminDashboardUsecase: IAdminDashboardUsecase,

    @inject("IHostDashboardUsecase")
    private _hostDashboardUsecase: IHostDashboardUsecase,

    @inject("IUserHomeUsecase")
    private _userHomeUsecase: IUserHomeUsecase,
  ) {}

  async adminDashboardController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this._adminDashboardUsecase.execute();

      res.status(HttpStatusCode.Ok).json(result);
    } catch (error) {
      // console.log(error);
      // if (error instanceof Error) {
      //   res.status(HttpStatusCode.BadRequest).json({ message: error.message });
      //   return;
      // }

      // res
      //   .status(HttpStatusCode.InternalServerError)
      //   .json({ message: "Internal Server Error" });

      next(error);
    }
  }

  async hostDashboardContrller(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const hostId = req.params.id;

      const result = await this._hostDashboardUsecase.execute(hostId);

      res.status(HttpStatusCode.Ok).json(result);
    } catch (error) {
      // console.log(error);
      // if (error instanceof Error) {
      //   res.status(HttpStatusCode.BadRequest).json({ message: error.message });
      //   return;
      // }

      // res
      //   .status(HttpStatusCode.InternalServerError)
      //   .json({ message: "Internal Server Error" });
      next(error);
    }
  }

  async homeData(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { limit, skip } = getPaginationParams(req);
      const result = await this._userHomeUsecase.execute(limit, skip);
      const totalPages = calculateTotalPages(result.totalPages, limit);
      result.totalPages = totalPages;
      res.status(HttpStatusCode.Ok).json(result);
    } catch (error) {
      next(error);
    }
  }
}
