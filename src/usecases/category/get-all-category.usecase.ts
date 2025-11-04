import { inject, injectable } from "tsyringe";
import { IGetAllCategoryUsecase } from "../../entities/usecaseInterfaces/category/get-all-category.usecase.interface";
import { ICategoryRepository } from "../../entities/repositoryInterfaces/category/categoryRepository.interface";
import { ICategoryModel } from "../../frameworks/database/mongo/models/category.model";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";
import { FilterQuery } from "mongoose";
import { ICategoryMapper } from "../../entities/mapperInterfaces/category-mapper.interface";

@injectable()
export class GetAllCategoryUsecase implements IGetAllCategoryUsecase {
  constructor(
    @inject("ICategoryRepository")
    private _categoryRepository: ICategoryRepository,

    @inject("ICategoryMapper")
    private _categoryMapper: ICategoryMapper,
  ) {}

  async execute(
    limit: number,
    skip: number,
    search: string,
  ): Promise<{ items: object[]; total: number }> {
    const filter: FilterQuery<object> = {};
    if (search.length > 0) {
      filter.categoryName = { $regex: search, $options: "i" };
    }
    const result = await this._categoryRepository.findAll(limit, skip, filter);

    if (!result)
      throw new AppError(
        "We can not process the request... Please try again.",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );

    const mappedCategory = this._categoryMapper.toDTOs(
      result.items as ICategoryModel[],
    );

    return { items: mappedCategory, total: result.total };
  }
}
