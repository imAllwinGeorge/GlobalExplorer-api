import { ICategoryModel } from "frameworks/database/mongo/models/category.model";

export interface IGetCategoryUsecase {
  execute(filter: object): Promise<ICategoryModel>;
}
