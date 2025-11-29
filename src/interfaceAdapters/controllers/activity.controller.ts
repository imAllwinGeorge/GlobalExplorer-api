import { inject, injectable } from "tsyringe";
import { IActivityController } from "../../entities/controllerInterfaces/activity-controller.interface";
import { IEditActivityUsecase } from "../../entities/usecaseInterfaces/activity/edit-activity.usecase.interface";
import { IGetActivitiesUsecase } from "../../entities/usecaseInterfaces/activity/get-activities.usecase.interface";
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
import { EditActivityDTO } from "../../shared/dtos/edit.dto";
import { AppError } from "../../shared/errors/appError";
import { IGetActivityUsecase } from "../../entities/usecaseInterfaces/activity/get-actvity.usecase.interface";
import { IUpdateDynamicPricingUsecase } from "../../entities/usecaseInterfaces/activity/update-dynamic-pricing.usecase.interface";
import { IUpdatePricingUsecase } from "../../entities/usecaseInterfaces/activity/update-pricing.usecase.interface";

@injectable()
export class ActivityController implements IActivityController {
  constructor(
    @inject("IEditActivityUsecase")
    private _editActivityUsecase: IEditActivityUsecase,

    @inject("IActivityUsecase")
    private _getActivityUsecase: IGetActivityUsecase,

    @inject("IGetActivitiesUsecase")
    private _getActivitiesUsecase: IGetActivitiesUsecase,

    @inject("IGetActivityDetailsUsecase")
    private _getActivityDetailsUsecase: IGetActivityDetailsUsecase,

    @inject("IGetFilteredActivityUsecase")
    private _getFilteredActivityUsecase: IGetFilteredAcitivityUsecase,

    @inject("IGetReviewUsecase")
    private _getReviewUsecase: IGetReviewUsecase,

    @inject("IUpdateDynamicPricingUsecase")
    private _updateDynamicPricingUsecase: IUpdateDynamicPricingUsecase,

    @inject("IUpdatePricingUsecase")
    private _updatePricingUsecase: IUpdatePricingUsecase,
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
      const activityId = req.params.id;
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

      const uploadedImages = files.map((images) => images.path);
      const images = [...existingImage, ...uploadedImages];

      const parsedLocation = JSON.parse(location); // [75.1, 10.2]
      const paresedRecurrenceDays = JSON.parse(recurrenceDays);

      const activity = await this._editActivityUsecase.execute(activityId, {
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
      } as EditActivityDTO);

      res.status(HttpStatusCode.OK).json({ activity });
    } catch (error) {
      next(error);
    }
  }

  async getActivity(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { activityId } = req.params;

      if (!activityId) {
        throw new AppError(
          "Invalid Activity Details",
          HttpStatusCode.BAD_REQUEST,
        );
      }

      const activity = await this._getActivityUsecase.execute(activityId);

      res.status(HttpStatusCode.OK).json({ activity });
    } catch (error) {
      next(error);
    }
  }

  async updateDynamicPricing(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { activityId } = req.params;
      const { data } = req.body;
      console.log(activityId, data);
      const activity = await this._updateDynamicPricingUsecase.execute(
        activityId,
        data,
      );

      res.status(HttpStatusCode.OK).json({ activity });
    } catch (error) {
      next(error);
    }
  }

  async updatePricing(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { activityId } = req.params;
      const { data } = req.body;
      console.log(activityId, data);
      const activity = await this._updatePricingUsecase.execute(
        activityId,
        data,
      );

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
      const activityId = req.params.id;
      const { data } = req.body;
      const activity = await this._editActivityUsecase.execute(
        activityId,
        data,
      );
      res.status(HttpStatusCode.OK).json({ activity });
    } catch (error) {
      next(error);
    }
  }

  async getAllActivities(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { limit, skip } = getPaginationParams(req);
      const { search, filter } = req.query;

      const { items, total } = await this._getActivitiesUsecase.execute(
        limit,
        skip,
        search as string,
        filter as string,
      );
      const totalPages = calculateTotalPages(total, limit);
      res.status(HttpStatusCode.OK).json({ activities: items, totalPages });
    } catch (error) {
      next(error);
    }
  }

  async getActivityDetails(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const activityId = req.params.id;
      if (!activityId) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: "Activity id is missing." });
        return;
      }
      const result = await this._getActivityDetailsUsecase.execute(activityId);
      const reviews = await this._getReviewUsecase.execute(activityId);
      res.status(HttpStatusCode.OK).json({
        activity: result.activity,
        razorpayAccountId: result.razorpayAccountId,
        availability: result.availability,
        reviews,
      });
    } catch (error) {
      next(error);
    }
  }

  async getFilteredActivity(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { limit, skip } = getPaginationParams(req);

      const lat = parseFloat(req.query.lat as string);
      const lng = parseFloat(req.query.lng as string);
      const distance = parseInt(req.query.distance as string);

      const priceRangeMax = parseInt(req.query.priceRangeMax as string);
      const priceRangeMin = parseInt(req.query.priceRangeMin as string);

      const { search, category } = req.query;

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
      console.log(
        "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
      );
      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}
