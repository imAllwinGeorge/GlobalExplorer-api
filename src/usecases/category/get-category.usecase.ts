import { inject, injectable } from "tsyringe";
import { IGetCategoryUsecase } from "../../entities/usecaseInterfaces/category/get-categoty.usecase.interface";
import { ICategoryRepository } from "../../entities/repositoryInterfaces/category/categoryRepository.interface";
import { CategoryResponseDTO } from "../../shared/dtos/response.dto";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";
import { ICategoryMapper } from "../../entities/mapperInterfaces/category-mapper.interface";

@injectable()
export class GetCatgoryUsecase implements IGetCategoryUsecase {
  constructor(
    @inject("ICategoryRepository")
    private _categoryRepository: ICategoryRepository,

    @inject("ICategoryMapper")
    private _categoryMapper: ICategoryMapper,
  ) {}

  async execute(filter: object): Promise<CategoryResponseDTO> {
    const category = await this._categoryRepository.findOne(filter);

    if (!category)
      throw new AppError(
        "failed to fetch the category",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );

    return this._categoryMapper.toDTO(category);
  }
}
