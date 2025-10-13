import { inject, injectable } from "tsyringe";
import { ISalesController } from "../../entities/controllerInterfaces/sales-controller.interface";
import { Request, Response, NextFunction } from "express";
import { IAdminSalesReportUsecase } from "../../entities/usecaseInterfaces/sales/admin-salesReport.interface";
import { HttpStatusCode } from "../../shared/constants/constants";
import { IHostSalesReportUsecase } from "../../entities/usecaseInterfaces/sales/host-salesReport.interface";

@injectable()
export class SalesController implements ISalesController {
  constructor(
    @inject("IAdminSalesReportUsecase")
    private _adminSalesReportUsecase: IAdminSalesReportUsecase,

    @inject("IHostSalesReportUsecase")
    private _hostSalesReportUsecase: IHostSalesReportUsecase,
  ) {}

  async generateSalesReport(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this._adminSalesReportUsecase.execute();

      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async generateHostSalesReport(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this._hostSalesReportUsecase.execute(id);

      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}
