import { ICategoryModel } from "frameworks/database/mongo/models/category.model";

export interface IGetCategoryUsecaseInterface {
  execute(filter: object): Promise<ICategoryModel>;
}
