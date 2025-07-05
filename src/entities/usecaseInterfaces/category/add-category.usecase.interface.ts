import { ICategoryModel } from "frameworks/database/mongo/models/category.model";

export interface IAddCategoryUsecaseInterface {
  execute(data: object): Promise<ICategoryModel>;
}
