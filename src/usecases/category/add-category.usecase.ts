import { ICategoryRepository } from "entities/repositoryInterfaces/category/categoryRepository.interface";
import { IAddCategoryUsecase } from "entities/usecaseInterfaces/category/add-category.usecase.interface";
import { ICategoryModel } from "frameworks/database/mongo/models/category.model";
import { inject, injectable } from "tsyringe";

@injectable()
export class AddCategoryUseCase implements IAddCategoryUsecase {
  constructor(
    @inject("ICategoryRepository")
    private _categoryRepository: ICategoryRepository,
  ) {}

  async execute(data: object): Promise<ICategoryModel> {
    const category = await this._categoryRepository.save(data);
    return category;
  }
}
