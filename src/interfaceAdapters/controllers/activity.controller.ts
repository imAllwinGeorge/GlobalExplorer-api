import { inject, injectable } from "tsyringe";
import { IActivityController } from "../../entities/controllerInterfaces/activity-controller.interface";
import { IEditActivityUsecase } from "../../entities/usecaseInterfaces/activity/edit-activity.usecase.interface";
import { IGetActivityUsecase } from "../../entities/usecaseInterfaces/activity/get-activity.usecase.interface";
import { IGetActivityDetailsUsecase } from "../../entities/usecaseInterfaces/activity/get-activity-details.usecase.interface";
import { IGetFilteredAcitivityUsecase } from "../../entities/usecaseInterfaces/activity/get-filtered-activity.usecase.interface";
import { IGetReviewUsecase } from "../../entities/usecaseInterfaces/review/get-review.interface";
import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../../shared/constants/constants";
import {
  calculateTotalPages,
  getPaginationParams,
} from "../../shared/utils/pagination.helper";
import logger from "../../infrastructures/logger";

@injectable()
export class ActivityController implements IActivityController {
  constructor(
    @inject("IEditActivityUsecase")
    private _editActivityUsecase: IEditActivityUsecase,

    @inject("IGetActivityUsecase")
    private _getActivityUsecase: IGetActivityUsecase,

    @inject("IGetActivityDetailsUsecase")
    private _getActivityDetailsUsecase: IGetActivityDetailsUsecase,

    @inject("IGetFilteredActivityUsecase")
    private _getFilteredActivityUsecase: IGetFilteredAcitivityUsecase,

    @inject("IGetReviewUsecase")
    private _getReviewUsecase: IGetReviewUsecase,
  ) {}
  async addActivity(req: Request, res: Response): Promise<void> {
    try {
      console.log(req, res);
    } catch (error) {
      console.log(error);
    }
  }

  async editActivity(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
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
          logger.warn("Failed to parse existingImage:", error);
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
      next(error);
    }
  }

  async updateActivity(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { data } = req.body;
      const activity = await this._editActivityUsecase.execute(id, data);
      res.status(HttpStatusCode.OK).json({ activity });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  async getAllActivities(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      // const data = {};
      const { data } = req.body || {};
      // const page = parseInt(req.query.page as string) || 1;
      // const limit = parseInt(req.query.limit as string) || 10;
      // const skip = (page - 1) * limit;
      const { limit, skip } = getPaginationParams(req);
      const { items, total } = await this._getActivityUsecase.execute(
        limit,
        skip,
        data,
      );
      const totalPages = calculateTotalPages(total, limit);
      res.status(HttpStatusCode.OK).json({ activities: items, totalPages });
    } catch (error) {
      // console.log(error);
      // res
      //   .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      //   .json({ message: "Internal Server Error" });
      next(error);
    }
  }

  async getActivityDetails(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: "Activity id is missing." });
        return;
      }
      const result = await this._getActivityDetailsUsecase.execute(id);
      const reviews = await this._getReviewUsecase.execute(id);
      res.status(HttpStatusCode.OK).json({
        activity: result.activity,
        razorpayAccountId: result.razorpayAccountId,
        availability: result.availability,
        reviews,
      });
    } catch (error) {
      // console.log(error);
      // res
      //   .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      //   .json({ message: "Internal Server Error" });
      next(error);
    }
  }

  async getFilteredActivity(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      // const page = parseInt(req.query.page as string) || 1;
      // const limit = parseInt(req.query.limit as string) || 10;

      const { limit, skip } = getPaginationParams(req);

      const lat = parseFloat(req.query.lat as string); // ❗ Prefer parseFloat for coordinates
      const lng = parseFloat(req.query.lng as string); // ❗ Same here
      const distance = parseInt(req.query.distance as string); // ✅ parseInt is fine for meters

      const priceRangeMax = parseInt(req.query.priceRangeMax as string);
      const priceRangeMin = parseInt(req.query.priceRangeMin as string);

      const { search, category } = req.query;

      // const skip = (page - 1) * limit;

      const filter = {
        search: search ? String(search) : undefined,
        category: category ? String(category) : undefined,
        lat: isNaN(lat) ? undefined : lat,
        lng: isNaN(lng) ? undefined : lng,
        distance: isNaN(distance) ? undefined : distance,
        priceRangeMax: isNaN(priceRangeMax) ? undefined : priceRangeMax,
        priceRangeMin: isNaN(priceRangeMin) ? undefined : priceRangeMin,
      };

      const result = await this._getFilteredActivityUsecase.execute(
        limit,
        skip,
        filter,
      );
      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      // if (error instanceof Error) {
      //   res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
      //   return;
      // }
      // res
      //   .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      //   .json({ message: "Internal Server Error" });
      next(error);
    }
  }
}
