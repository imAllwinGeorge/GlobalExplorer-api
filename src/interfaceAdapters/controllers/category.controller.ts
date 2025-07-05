import { ICategoryControllerInterface } from "entities/controllerInterfaces/category-controller.interface";
import { IAddCategoryUsecaseInterface } from "entities/usecaseInterfaces/category/add-category.usecase.interface";
import { IGetAllCategoryUsecaseInterface } from "entities/usecaseInterfaces/category/get-all-category.usecase.interface";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { categorySchema } from "./auth/validations/category.validation.schema";
import { IEditCategoryUsecaseInterface } from "entities/usecaseInterfaces/category/edit-category.usecase.interface";
import { IUpdateCategoryUsecaseInterface } from "entities/usecaseInterfaces/category/update-category.usecase.interface";

@injectable()
export class ICategoryController implements ICategoryControllerInterface {
  constructor(
    @inject("IGetAllCategoryUsecase")
    private _getAllCategoryUsecase: IGetAllCategoryUsecaseInterface,

    @inject("IAddCategoryUsecase")
    private _addCategoryUsecase: IAddCategoryUsecaseInterface,

    @inject("IEditCategoryUsecase")
    private _editCategoryUsecase: IEditCategoryUsecaseInterface,

    @inject("IUpdateCategoryUsecase")
    private _updateStatusCategory: IUpdateCategoryUsecaseInterface,
  ) {}

  async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const category = await this._getAllCategoryUsecase.execute();

      res.status(200).json({ category });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "pwgwjg" });
    }
  }

  async addCategory(req: Request, res: Response): Promise<void> {
    try {
      const { data } = req.body;

      const validateData = categorySchema.parse(data);
      if (!validateData) {
        res.status(400).json({ message: "Invalid input data!" });
        return;
      }
      const category = await this._addCategoryUsecase.execute(validateData);
      if (category) {
        res.status(201).json({ category });
        return;
      }
      res.status(400).json({ message: "Ivalid Request" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal sever error" });
    }
  }

  async editCategory(req: Request, res: Response): Promise<void> {
    try {
      const { _id, value } = req.body;
      const validateData = categorySchema.parse(value);
      if (!_id || !validateData) {
        res.status(400).json({ message: "Bad request, Missing data" });
        return;
      }
      const category = await this._editCategoryUsecase.execute(
        _id,
        validateData,
      );
      res.status(200).json({ category });
    } catch (error) {
      console.log(error);
    }
  }

  async updateCategoryStatus(req: Request, res: Response): Promise<void> {
    try {
      const { _id, value } = req.body;
      const category = await this._updateStatusCategory.execute(_id, value);
      res.status(200).json({ category });
      return;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal server Error!" });
    }
  }
}
