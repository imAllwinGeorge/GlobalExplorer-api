import { ICategoryRepositoryInterface } from "entities/repositoryInterfaces/category/categoryRepository.interface";
import { IGetAllCategoryNameUsecaseInterface } from "entities/usecaseInterfaces/category/get-all-category-names.usecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllCategoryNameUsecase
  implements IGetAllCategoryNameUsecaseInterface
{
  constructor(
    @inject("ICategoryRepository")
    private _categoryRepository: ICategoryRepositoryInterface,
  ) {}

  async execute(): Promise<{ _id: string; categoryName: string }[]> {
    return await this._categoryRepository.findAllCategoryNames();
  }
}
