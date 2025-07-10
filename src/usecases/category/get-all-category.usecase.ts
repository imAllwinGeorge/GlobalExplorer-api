import { ICategoryRepositoryInterface } from "entities/repositoryInterfaces/category/categoryRepository.interface";
import { IGetAllCategoryUsecaseInterface } from "entities/usecaseInterfaces/category/get-all-category.usecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllCategoryUsecase implements IGetAllCategoryUsecaseInterface {
  constructor(
    @inject("ICategoryRepository")
    private _categoryRepository: ICategoryRepositoryInterface,
  ) {}

  async execute(
    limit: number,
    skip: number,
  ): Promise<{ items: object[]; total: number }> {
    const result = await this._categoryRepository.findAll(limit, skip, {});
    if (!result)
      throw new Error("We can not process the request... Please try again.");
    return result;
  }
}
