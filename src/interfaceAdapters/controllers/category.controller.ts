import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { ICategoryController } from "../../entities/controllerInterfaces/category-controller.interface";
import { IGetAllCategoryUsecase } from "../../entities/usecaseInterfaces/category/get-all-category.usecase.interface";
import { IAddCategoryUsecase } from "../../entities/usecaseInterfaces/category/add-category.usecase.interface";
import { IEditCategoryUsecase } from "../../entities/usecaseInterfaces/category/edit-category.usecase.interface";
import { IUpdateCategoryUsecase } from "../../entities/usecaseInterfaces/category/update-category.usecase.interface";
import { IGetAllCategoryNameUsecase } from "../../entities/usecaseInterfaces/category/get-all-category-names.usecase.interface";
import {
  calculateTotalPages,
  getPaginationParams,
} from "../../shared/utils/pagination.helper";
import { HttpStatusCode } from "../../shared/constants/constants";
import { categorySchema } from "./auth/validations/category.validation.schema";

@injectable()
export class CategoryController implements ICategoryController {
  constructor(
    @inject("IGetAllCategoryUsecase")
    private _getAllCategoryUsecase: IGetAllCategoryUsecase,

    @inject("IAddCategoryUsecase")
    private _addCategoryUsecase: IAddCategoryUsecase,

    @inject("IEditCategoryUsecase")
    private _editCategoryUsecase: IEditCategoryUsecase,

    @inject("IUpdateCategoryUsecase")
    private _updateStatusCategory: IUpdateCategoryUsecase,

    @inject("IGetAllCategoryNameUsecase")
    private _getAllCategoryNameUsecase: IGetAllCategoryNameUsecase,
  ) {}

  async getCategories(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { limit, skip } = getPaginationParams(req);
      const { search } = req.query;
      const result = await this._getAllCategoryUsecase.execute(
        limit,
        skip,
        (search as string) || "",
      );
      const totalPages = calculateTotalPages(result.total, limit);

      res
        .status(HttpStatusCode.OK)
        .json({ categories: result.items, totalPages });
      return;
    } catch (error) {
      next(error);
    }
  }

  async addCategory(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { data } = req.body;

      const validateData = categorySchema.parse(data);

      if (!validateData) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: "Invalid input data!" });
        return;
      }

      const category = await this._addCategoryUsecase.execute(validateData);

      if (category) {
        res.status(HttpStatusCode.CREATED).json({ category });
        return;
      }

      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ message: "Ivalid Request" });
    } catch (error) {
      next(error);
    }
  }

  async editCategory(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { categoryId, value } = req.body;
      const validateData = categorySchema.parse(value);

      if (!categoryId || !validateData) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: "Bad request, Missing data" });
        return;
      }

      const category = await this._editCategoryUsecase.execute(
        categoryId,
        validateData,
      );

      res.status(HttpStatusCode.OK).json({ category });
    } catch (error) {
      next(error);
    }
  }

  async updateCategoryStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { categoryId, value } = req.body;
      const category = await this._updateStatusCategory.execute(
        categoryId,
        value,
      );
      res.status(HttpStatusCode.OK).json({ category });
      return;
    } catch (error) {
      next(error);
    }
  }

  async getCategoryNames(
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
}
