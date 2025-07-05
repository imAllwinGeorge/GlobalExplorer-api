import { ICategoryModel } from "frameworks/database/mongo/models/category.model";

export interface IUpdateCategoryUsecaseInterface {
  execute(_id: string, value: object): Promise<ICategoryModel>;
}
