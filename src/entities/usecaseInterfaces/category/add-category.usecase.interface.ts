import { ICategoryModel } from "frameworks/database/mongo/models/category.model";

export interface IAddCategoryUsecase {
  execute(data: object): Promise<ICategoryModel>;
}
