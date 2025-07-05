import { ICategoryRepositoryInterface } from "entities/repositoryInterfaces/category/categoryRepository.interface";
import { IEditCategoryUsecaseInterface } from "entities/usecaseInterfaces/category/edit-category.usecase.interface";
import { ICategoryModel } from "frameworks/database/mongo/models/category.model";
import { inject, injectable } from "tsyringe";

@injectable()
export class EditCategoryUsecase implements IEditCategoryUsecaseInterface {
  constructor(
    @inject("ICategoryRepository")
    private _categoryRepository: ICategoryRepositoryInterface,
  ) {}

  async execute(
    _id: string,
    value: { categoryName: string; description: string },
  ): Promise<ICategoryModel | null> {
    const similarCategory = await this._categoryRepository.findExcludingId(
      _id,
      value.categoryName,
    );

    if (similarCategory) {
      throw new Error("Category with same Name already exists");
    }

    const category = await this._categoryRepository.findOneAndUpdate(
      { _id },
      value,
    );
    console.log(
      "sfgnioghiwedgasjkdhgjkasjkdghasdjkgjklasdgjkasdjkfgjksd",
      category,
      value,
    );
    return category;
  }
}
