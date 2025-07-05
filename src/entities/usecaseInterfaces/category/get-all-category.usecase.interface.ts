import { ICategoryModel } from "frameworks/database/mongo/models/category.model";

export interface IGetAllCategoryUsecaseInterface {
  execute(): Promise<ICategoryModel[]>;
}
