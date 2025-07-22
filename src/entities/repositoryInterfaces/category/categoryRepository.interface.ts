import { ICategoryModel } from "frameworks/database/mongo/models/category.model";
import { IBaseRepository } from "../IBaseRepository.interface";

export interface ICategoryRepository extends IBaseRepository<ICategoryModel> {
  findExcludingId(
    excludeId: string,
    value: string,
  ): Promise<ICategoryModel | null>;

  findAllCategoryNames(): Promise<{ _id: string; categoryName: string }[]>;
}
