import { ICategoryRepository } from "entities/repositoryInterfaces/category/categoryRepository.interface";
import { IUpdateCategoryUsecase } from "entities/usecaseInterfaces/category/update-category.usecase.interface";
import { ICategoryModel } from "frameworks/database/mongo/models/category.model";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateStatusCategoryUsecase implements IUpdateCategoryUsecase {
  constructor(
    @inject("ICategoryRepository")
    private _categoryRepository: ICategoryRepository,
  ) {}

  async execute(_id: string, value: object): Promise<ICategoryModel> {
    const category = await this._categoryRepository.findOneAndUpdate(
      { _id },
      value,
    );
    if (!category) throw new Error("could not find the category!");
    return category;
  }
}
