import { ICategoryModel } from "frameworks/database/mongo/models/category.model";

export interface IUpdateCategoryUsecase {
  execute(_id: string, value: object): Promise<ICategoryModel>;
}
