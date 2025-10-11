import { inject, injectable } from "tsyringe";
import { IUpdateCategoryUsecase } from "../../entities/usecaseInterfaces/category/update-category.usecase.interface";
import { ICategoryRepository } from "../../entities/repositoryInterfaces/category/categoryRepository.interface";
import { CategoryMapper } from "../../shared/mappers/category.mapper";
import { CategoryResponseDTO } from "../../shared/dtos/response.dto";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";

@injectable()
export class UpdateStatusCategoryUsecase implements IUpdateCategoryUsecase {
  constructor(
    @inject("ICategoryRepository")
    private _categoryRepository: ICategoryRepository,

    @inject(CategoryMapper)
    private _categoryMapper: CategoryMapper,
  ) {}

  async execute(_id: string, value: object): Promise<CategoryResponseDTO> {
    const category = await this._categoryRepository.findOneAndUpdate(
      { _id },
      value,
    );

    if (!category)
      throw new AppError(
        "could not find the category!",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );

    return this._categoryMapper.toDTO(category);
  }
}
