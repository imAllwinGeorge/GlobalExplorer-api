import { inject, injectable } from "tsyringe";
import { IUpdateCategoryUsecase } from "../../entities/usecaseInterfaces/category/update-category.usecase.interface";
import { ICategoryRepository } from "../../entities/repositoryInterfaces/category/categoryRepository.interface";
import { CategoryResponseDTO } from "../../shared/dtos/response.dto";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";
import { ICategoryMapper } from "../../entities/mapperInterfaces/category-mapper.interface";

@injectable()
export class UpdateStatusCategoryUsecase implements IUpdateCategoryUsecase {
  constructor(
    @inject("ICategoryRepository")
    private _categoryRepository: ICategoryRepository,

    @inject("ICategoryMapper")
    private _categoryMapper: ICategoryMapper,
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
