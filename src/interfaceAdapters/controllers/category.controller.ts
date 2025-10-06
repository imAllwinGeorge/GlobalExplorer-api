import { Request, Response } from "express";
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

  async getCategories(req: Request, res: Response): Promise<void> {
    try {
      // const page = parseInt(req.query.page as string);
      // const limit = parseInt(req.query.limit as string);
      // const skip = (page - 1) * limit;
      const { limit, skip } = getPaginationParams(req);
      const result = await this._getAllCategoryUsecase.execute(limit, skip);
      const totalPages = calculateTotalPages(result.total, limit);

      res
        .status(HttpStatusCode.OK)
        .json({ categories: result.items, totalPages });
      return;
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }

  async addCategory(req: Request, res: Response): Promise<void> {
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
      console.log(error);
      if (error instanceof Error) {
        if (error.message === "Category name already exist!") {
          res
            .status(HttpStatusCode.BAD_REQUEST)
            .json({ message: "Category name already exist!" });
        }
        return;
      }

      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal sever error" });
    }
  }

  async editCategory(req: Request, res: Response): Promise<void> {
    try {
      const { _id, value } = req.body;
      const validateData = categorySchema.parse(value);

      if (!_id || !validateData) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: "Bad request, Missing data" });
        return;
      }

      const category = await this._editCategoryUsecase.execute(
        _id,
        validateData,
      );

      res.status(HttpStatusCode.OK).json({ category });
    } catch (error) {
      console.log(error);
    }
  }

  async updateCategoryStatus(req: Request, res: Response): Promise<void> {
    try {
      const { _id, value } = req.body;
      const category = await this._updateStatusCategory.execute(_id, value);
      res.status(HttpStatusCode.OK).json({ category });
      return;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
        return;
      }

      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server Error!" });
    }
  }

  async getCategoryNames(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this._getAllCategoryNameUsecase.execute();

      res.status(HttpStatusCode.OK).json({ categories });
    } catch (error) {
      if (error instanceof Error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
        return;
      }

      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }
}
