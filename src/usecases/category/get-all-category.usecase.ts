import { inject, injectable } from "tsyringe";
import { IGetAllCategoryUsecase } from "../../entities/usecaseInterfaces/category/get-all-category.usecase.interface";
import { ICategoryRepository } from "../../entities/repositoryInterfaces/category/categoryRepository.interface";
import { CategoryMapper } from "../../shared/mappers/category.mapper";
import { ICategoryModel } from "../../frameworks/database/mongo/models/category.model";

@injectable()
export class GetAllCategoryUsecase implements IGetAllCategoryUsecase {
  constructor(
    @inject("ICategoryRepository")
    private _categoryRepository: ICategoryRepository,

    @inject(CategoryMapper)
    private _categoryMapper: CategoryMapper,
  ) {}

  async execute(
    limit: number,
    skip: number,
  ): Promise<{ items: object[]; total: number }> {
    const result = await this._categoryRepository.findAll(limit, skip, {});

    if (!result)
      throw new Error("We can not process the request... Please try again.");

    const mappedCategory = this._categoryMapper.toDTOs(
      result.items as ICategoryModel[],
    );

    return { items: mappedCategory, total: result.total };
  }
}
