import { ICategoryModel } from "frameworks/database/mongo/models/category.model";

export interface IEditCategoryUsecase {
  execute(
    _id: string,
    value: { categoryName: string; description: string },
  ): Promise<ICategoryModel | null>;
}
