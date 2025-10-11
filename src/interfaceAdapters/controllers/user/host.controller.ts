import { inject, injectable } from "tsyringe";
import { hostSchema } from "../auth/validations/host-signup.validation.schema";
import { IHostController } from "../../../entities/controllerInterfaces/users/host-controller.interface";
import { IGetAllCategoryUsecase } from "../../../entities/usecaseInterfaces/category/get-all-category.usecase.interface";
import { IGetActivityUsecase } from "../../../entities/usecaseInterfaces/activity/get-activity.usecase.interface";
import { IAddActivityUsecase } from "../../../entities/usecaseInterfaces/activity/add-activity.usecase.interface";
import { IGetAllCategoryNameUsecase } from "../../../entities/usecaseInterfaces/category/get-all-category-names.usecase.interface";
import { IUpdateStatusUsecase } from "../../../entities/usecaseInterfaces/user/update-status.usecase.interface";
import { NextFunction, Request, Response } from "express";
import {
  calculateTotalPages,
  getPaginationParams,
} from "../../../shared/utils/pagination.helper";
import { Types } from "mongoose";
import { HttpStatusCode } from "../../../shared/constants/constants";
import { z } from "zod";

type HostData = z.infer<typeof hostSchema>;
@injectable()
export class HostController implements IHostController {
  constructor(
    @inject("IGetAllCategoryUsecase")
    private _getAllCategoryUsecase: IGetAllCategoryUsecase,

    @inject("IGetActivityUsecase")
    private _getActivityUsecase: IGetActivityUsecase,

    @inject("IAddActivityUsecase")
    private _addActvityUsecase: IAddActivityUsecase,

    @inject("IGetAllCategoryNameUsecase")
    private _getAllCategoryNameUsecase: IGetAllCategoryNameUsecase,

    @inject("IUpdateStatusUsecase")
    private _updateUserUsecase: IUpdateStatusUsecase,
  ) {}

  async getActivity(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { limit, skip } = getPaginationParams(req);
      const result = await this._getActivityUsecase.execute(limit, skip, {
        userId: new Types.ObjectId(id),
      });
      const totalPages = calculateTotalPages(result.total, limit);
      res
        .status(HttpStatusCode.OK)
        .json({ activities: result.items, totalPages });
    } catch (error) {
      next(error);
    }
  }

  async getCategories(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const categories = await this._getAllCategoryNameUsecase.execute();
      res.status(HttpStatusCode.OK).json({ categories });
    } catch (error) {
      next(error);
    }
  }

  async addActivity(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
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
      let images = [];
      const files = req.files as Express.Multer.File[];
      console.log("cloudinary return data: ", files);
      images = files.map((images) => images.path);

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
      next(error);
    }
  }

  async editProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const parsedData = hostSchema.parse(req.body);
      const files = req.files as Express.Multer.File[];
      console.log(parsedData, files);
      type HostFileFields =
        | "kyc_idProof"
        | "kyc_addressProof"
        | "kyc_panCard"
        | "registrationCertificate"
        | "safetyCertificate"
        | "license"
        | "insurance";

      files?.forEach((file) => {
        const key = file.fieldname;

        if (
          [
            "kyc_idProof",
            "kyc_addressProof",
            "kyc_panCard",
            "registrationCertificate",
            "safetyCertificate",
            "license",
            "insurance",
          ].includes(key)
        ) {
          (parsedData as HostData)[key as HostFileFields] = file.filename;
        }
      });
      const updatedProfile = await this._updateUserUsecase.execute(
        id,
        parsedData,
        parsedData.role,
      );
      res.status(HttpStatusCode.OK).json({ user: updatedProfile });
    } catch (error) {
      next(error);
      // console.log(error);
      // if (error instanceof Error) {
      //   res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
      //   return;
      // }
      // res
      //   .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      //   .json({ message: "Internal server error" });
    }
  }
}
