import { ICategoryRepositoryInterface } from "entities/repositoryInterfaces/category/categoryRepository.interface";
import { IAddCategoryUsecaseInterface } from "entities/usecaseInterfaces/category/add-category.usecase.interface";
import { ICategoryModel } from "frameworks/database/mongo/models/category.model";
import { inject, injectable } from "tsyringe";

@injectable()
export class AddCategoryUseCase implements IAddCategoryUsecaseInterface {
  constructor(
    @inject("ICategoryRepository")
    private _categoryRepository: ICategoryRepositoryInterface,
  ) {}

  async execute(data: object): Promise<ICategoryModel> {
    const category = await this._categoryRepository.save(data);
    return category;
  }
}
