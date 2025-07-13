import { IActivityControllerInterface } from "entities/controllerInterfaces/activity-controller.interface";
import { IEditActivityUsecaseInterface } from "entities/usecaseInterfaces/activity/edit-activity.usecase.interface";
import { IGetActivityDetailsUsecaseInterface } from "entities/usecaseInterfaces/activity/get-activity-details.usecase.interface";
import { IGetActivityUsecaseInterface } from "entities/usecaseInterfaces/activity/get-activity.usecase.interface";
import { Request, Response } from "express";
import { HttpStatusCode } from "shared/constants/statusCodes";
import { inject, injectable } from "tsyringe";

@injectable()
export class ActivityController implements IActivityControllerInterface {
  constructor(
    @inject("IEditActivityUsecase")
    private _editActivityUsecase: IEditActivityUsecaseInterface,

    @inject("IGetActivityUsecase")
    private _getActivityUsecase: IGetActivityUsecaseInterface,

    @inject("IGetActivityDetailsUsecase")
    private _getActivityDetailsUsecase: IGetActivityDetailsUsecaseInterface,
  ) {}
  async addActivity(req: Request, res: Response): Promise<void> {
    try {
      console.log(req, res);
    } catch (error) {
      console.log(error);
    }
  }

  async editActivity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
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
      let existingImage = req.body.existingImage;
      if (typeof existingImage === "string") {
        try {
          existingImage = JSON.parse(existingImage); // will now be a real array
        } catch (error) {
          console.warn("Failed to parse existingImage:", error);
          existingImage = []; // fallback
        }
      }

      const files = req.files as Express.Multer.File[];

      const uploadedImages = files.map((images) => images.filename);
      const images = [...existingImage, ...uploadedImages];

      const parsedLocation = JSON.parse(location); // [75.1, 10.2]
      const paresedRecurrenceDays = JSON.parse(recurrenceDays);
      const activity = await this._editActivityUsecase.execute(id, {
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
      res.status(HttpStatusCode.OK).json({ activity });
    } catch (error) {
      console.log(error);
    }
  }

  async updateActivity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { data } = req.body;
      const activity = await this._editActivityUsecase.execute(id, data);
      res.status(HttpStatusCode.OK).json({ activity });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllActivities(req: Request, res: Response): Promise<void> {
    try {
      const data = {};
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
      const { items, total } = await this._getActivityUsecase.execute(
        limit,
        skip,
        data,
      );
      const totalPages = Math.ceil(total / limit);
      res.status(HttpStatusCode.OK).json({ activities: items, totalPages });
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }

  async getActivityDetails(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: "Activity id is missing." });
        return;
      }
      const activity = await this._getActivityDetailsUsecase.execute(id);
      res.status(HttpStatusCode.OK).json({ activity });
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }
}
