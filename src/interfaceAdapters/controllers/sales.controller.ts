import { inject, injectable } from "tsyringe";
import { ISalesController } from "../../entities/controllerInterfaces/sales-controller.interface";
import { Request, Response, NextFunction } from "express";
import { IAdminSalesDetailsUsecase } from "../../entities/usecaseInterfaces/sales/admin-salesReport.interface";
import { HttpStatusCode } from "../../shared/constants/constants";
import { IHostSalesDetailsUsecase } from "../../entities/usecaseInterfaces/sales/host-salesDetails.interface";
import { ISalesReportUsecase } from "../../entities/usecaseInterfaces/sales/sales-report.interface";
import {
  calculateTotalPages,
  getPaginationParams,
} from "../../shared/utils/pagination.helper";
import { DateFilterType, SalesFilters } from "../../shared/types/types";

@injectable()
export class SalesController implements ISalesController {
  constructor(
    @inject("IAdminSalesDetailsUsecase")
    private _adminSalesReportUsecase: IAdminSalesDetailsUsecase,

    @inject("IHostSalesDetailsUsecase")
    private _hostSalesDetailsUsecase: IHostSalesDetailsUsecase,

    @inject("ISalesReportUsecase")
    private salesReportUsecase: ISalesReportUsecase,
  ) {}

  async generateSalesDetails(
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

  async generateHostSalesDetails(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const hostId = req.params.id;
      const result = await this._hostSalesDetailsUsecase.execute(hostId);

      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async hostSalesReport(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { hostId } = req.params;
      const { dateType, fromDate, toDate, minPrice, maxPrice } = req.query;
      const { skip, limit } = getPaginationParams(req);

      const filter: SalesFilters = {
        dateFilterType: dateType as DateFilterType,
        fromDate: fromDate as string,
        toDate: toDate as string,
        minPrice: parseInt(minPrice as string),
        maxPrice: parseInt(maxPrice as string),
      };

      const { bookings, total } = await this.salesReportUsecase.execute({
        filter,
        limit,
        skip,
        hostId,
      });

      res
        .status(HttpStatusCode.OK)
        .json({ bookings, totolPages: calculateTotalPages(total, limit) });
    } catch (error) {
      next(error);
    }
  }

  async adminSalesReport(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { limit, skip } = getPaginationParams(req);
      const { dateType, fromDate, toDate, minPrice, maxPrice } = req.query;

      const filter: SalesFilters = {
        dateFilterType: dateType as DateFilterType,
        fromDate: fromDate as string,
        toDate: toDate as string,
        minPrice: parseInt(minPrice as string),
        maxPrice: parseInt(maxPrice as string),
      };

      const { bookings, total } = await this.salesReportUsecase.execute({
        filter,
        limit,
        skip,
      });

      res
        .status(HttpStatusCode.OK)
        .json({ bookings, totalPages: calculateTotalPages(total, limit) });
    } catch (error) {
      next(error);
    }
  }

  async activitySalesReport(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { activityId } = req.params;
      const { limit, skip } = getPaginationParams(req);
      const { dateType, fromDate, toDate, minPrice, maxPrice } = req.query;

      const filter: SalesFilters = {
        dateFilterType: dateType as DateFilterType,
        fromDate: fromDate as string,
        toDate: toDate as string,
        minPrice: parseInt(minPrice as string),
        maxPrice: parseInt(maxPrice as string),
      };

      const { bookings, total } = await this.salesReportUsecase.execute({
        filter,
        limit,
        skip,
        activityId,
      });

      res
        .status(HttpStatusCode.OK)
        .json({ bookings, totalPages: calculateTotalPages(total, limit) });
    } catch (error) {
      next(error);
    }
  }
}
