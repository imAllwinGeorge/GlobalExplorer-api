import { inject, injectable } from "tsyringe";
import { IAddCategoryUsecase } from "../../entities/usecaseInterfaces/category/add-category.usecase.interface";
import { ICategoryRepository } from "../../entities/repositoryInterfaces/category/categoryRepository.interface";
import { CategoryMapper } from "../../shared/mappers/category.mapper";
import { CategoryResponseDTO } from "../../shared/dtos/response.dto";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";

@injectable()
export class AddCategoryUseCase implements IAddCategoryUsecase {
  constructor(
    @inject("ICategoryRepository")
    private _categoryRepository: ICategoryRepository,

    @inject(CategoryMapper)
    private _categoryMapper: CategoryMapper,
  ) {}

  async execute(data: {
    categoryName: string;
    description: string;
  }): Promise<CategoryResponseDTO> {
    const isExist = await this._categoryRepository.isNameExist(
      "categoryName",
      data.categoryName,
    );

    if (isExist) {
      throw new AppError(
        "Category name already exist!",
        HttpStatusCode.CONFLICT,
      );
    }

    const category = await this._categoryRepository.save(data);

    return this._categoryMapper.toDTO(category);
  }
}
