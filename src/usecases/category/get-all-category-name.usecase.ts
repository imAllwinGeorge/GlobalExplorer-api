import { ICategoryRepository } from "entities/repositoryInterfaces/category/categoryRepository.interface";
import { IGetAllCategoryNameUsecase } from "entities/usecaseInterfaces/category/get-all-category-names.usecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllCategoryNameUsecase implements IGetAllCategoryNameUsecase {
  constructor(
    @inject("ICategoryRepository")
    private _categoryRepository: ICategoryRepository,
  ) {}

  async execute(): Promise<{ _id: string; categoryName: string }[]> {
    return await this._categoryRepository.findAllCategoryNames();
  }
}
