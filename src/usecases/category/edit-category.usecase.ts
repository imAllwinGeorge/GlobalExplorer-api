import { inject, injectable } from "tsyringe";
import { IEditCategoryUsecase } from "../../entities/usecaseInterfaces/category/edit-category.usecase.interface";
import { ICategoryRepository } from "../../entities/repositoryInterfaces/category/categoryRepository.interface";
import { CategoryMapper } from "../../shared/mappers/category.mapper";
import { CategoryResponseDTO } from "../../shared/dtos/response.dto";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";

@injectable()
export class EditCategoryUsecase implements IEditCategoryUsecase {
  constructor(
    @inject("ICategoryRepository")
    private _categoryRepository: ICategoryRepository,

    @inject(CategoryMapper)
    private _categoryMapper: CategoryMapper,
  ) {}

  async execute(
    _id: string,
    value: { categoryName: string; description: string },
  ): Promise<CategoryResponseDTO | null> {
    const similarCategory = await this._categoryRepository.findExcludingId(
      _id,
      value.categoryName,
    );

    if (similarCategory) {
      throw new AppError(
        "Category with same Name already exists",
        HttpStatusCode.CONFLICT,
      );
    }

    const category = await this._categoryRepository.findOneAndUpdate(
      { _id },
      value,
    );

    return category ? this._categoryMapper.toDTO(category) : null;
  }
}
