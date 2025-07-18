import { IHostControllerInterface } from "entities/controllerInterfaces/users/host-controller.interface";
import { IAddActivityUsecaseInterface } from "entities/usecaseInterfaces/activity/add-activity.usecase.interface";
import { IGetActivityUsecaseInterface } from "entities/usecaseInterfaces/activity/get-activity.usecase.interface";
import { IGetAllCategoryNameUsecaseInterface } from "entities/usecaseInterfaces/category/get-all-category-names.usecase.interface";
import { IGetAllCategoryUsecaseInterface } from "entities/usecaseInterfaces/category/get-all-category.usecase.interface";
import { Request, Response } from "express";
import { Types } from "mongoose";
import { HttpStatusCode } from "shared/constants/statusCodes";
import { inject, injectable } from "tsyringe";

@injectable()
export class HostController implements IHostControllerInterface {
  constructor(
    @inject("IGetAllCategoryUsecase")
    private _getAllCategoryUsecase: IGetAllCategoryUsecaseInterface,

    @inject("IGetActivityUsecase")
    private _getActivityUsecase: IGetActivityUsecaseInterface,

    @inject("IAddActivityUsecase")
    private _addActvityUsecase: IAddActivityUsecaseInterface,

    @inject("IGetAllCategoryNameUsecase")
    private _getAllCategoryNameUsecase: IGetAllCategoryNameUsecaseInterface,
  ) {}

  async getActivity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
      const result = await this._getActivityUsecase.execute(limit, skip, {
        userId: new Types.ObjectId(id),
      });
      const totalPages = Math.ceil(result.total / limit);
      res
        .status(HttpStatusCode.OK)
        .json({ activities: result.items, totalPages });
    } catch (error) {
      console.log(error);
    }
  }

  async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this._getAllCategoryNameUsecase.execute();
      res.status(HttpStatusCode.OK).json({ categories });
    } catch (error) {
      console.log(error);
    }
  }

  async addActivity(req: Request, res: Response): Promise<void> {
    try {
      const {
        activityName,
        itenary,
        maxCapacity,
        categoryId,
        pricePerHead,
        userId,
        street,
        city,
        district,
        state,
        postalCode,
        country,
        recurrenceDays,
        reportingPlace,
        reportingTime,
        location,
      } = req.body;
      console.log("jasgsdgvbo;asdgvo;nasd;gvn;sd           :", recurrenceDays);
      let images = [];
      const files = req.files as Express.Multer.File[];

      images = files.map((images) => images.filename);

      const parsedLocation = JSON.parse(location); // [75.1, 10.2]
      const paresedRecurrenceDays = JSON.parse(recurrenceDays);
      const activity = await this._addActvityUsecase.execute({
        activityName,
        itenary,
        maxCapacity,
        categoryId,
        pricePerHead,
        userId,
        street,
        city,
        district,
        state,
        postalCode,
        country,
        recurrenceDays: paresedRecurrenceDays,
        reportingPlace,
        reportingTime,
        location: parsedLocation,
        images,
      });

      if (activity) {
        res.status(HttpStatusCode.CREATED).json({ activity });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
