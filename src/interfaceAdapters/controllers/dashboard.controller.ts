import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IDashboardController } from "../../entities/controllerInterfaces/dashboard-controller.interface";
import { IAdminDashboardUsecase } from "../../entities/usecaseInterfaces/dashboard/admin-dashboard.interface";
import { IHostDashboardUsecase } from "../../entities/usecaseInterfaces/dashboard/host-dashboard.interface";

@injectable()
export class DashBoardController implements IDashboardController {
  constructor(
    @inject("IAdminDashboardUsecase")
    private _adminDashboardUsecase: IAdminDashboardUsecase,

    @inject("IHostDashboardUsecase")
    private _hostDashboardUsecase: IHostDashboardUsecase,
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
      const { id } = req.params;

      const result = await this._hostDashboardUsecase.execute(id);

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
}
