import { ICategoryRepositoryInterface } from "entities/repositoryInterfaces/category/categoryRepository.interface";
import { IGetCategoryUsecaseInterface } from "entities/usecaseInterfaces/category/get-categoty.usecase.interface";
import { ICategoryModel } from "frameworks/database/mongo/models/category.model";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetCatgoryUsecase implements IGetCategoryUsecaseInterface {
  constructor(
    @inject("ICategoryRepository")
    private _categoryRepository: ICategoryRepositoryInterface,
  ) {}

  async execute(filter: object): Promise<ICategoryModel> {
    const category = await this._categoryRepository.findOne(filter);
    if (!category) throw new Error("failed to fetch the category");
    return category;
  }
}
