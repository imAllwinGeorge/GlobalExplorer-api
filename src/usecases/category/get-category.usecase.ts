import { inject, injectable } from "tsyringe";
import { IGetCategoryUsecase } from "../../entities/usecaseInterfaces/category/get-categoty.usecase.interface";
import { ICategoryRepository } from "../../entities/repositoryInterfaces/category/categoryRepository.interface";
import { CategoryMapper } from "../../shared/mappers/category.mapper";
import { CategoryResponseDTO } from "../../shared/dtos/response.dto";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";

@injectable()
export class GetCatgoryUsecase implements IGetCategoryUsecase {
  constructor(
    @inject("ICategoryRepository")
    private _categoryRepository: ICategoryRepository,

    @inject(CategoryMapper)
    private _categoryMapper: CategoryMapper,
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
