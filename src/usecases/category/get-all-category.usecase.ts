import { ICategoryRepositoryInterface } from "entities/repositoryInterfaces/category/categoryRepository.interface";
import { IGetAllCategoryUsecaseInterface } from "entities/usecaseInterfaces/category/get-all-category.usecase.interface";
import { ICategoryModel } from "frameworks/database/mongo/models/category.model";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllCategoryUsecase implements IGetAllCategoryUsecaseInterface {
  constructor(
    @inject("ICategoryRepository")
    private _categoryRepository: ICategoryRepositoryInterface,
  ) {}

  async execute(): Promise<ICategoryModel[]> {
    const category = await this._categoryRepository.find({});
    console.log("finiding categories....", category);
    return category;
  }
}
