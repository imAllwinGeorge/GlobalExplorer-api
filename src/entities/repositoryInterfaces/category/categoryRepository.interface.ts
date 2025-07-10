import { ICategoryModel } from "frameworks/database/mongo/models/category.model";
import { IBaseRepositoryInterface } from "../IBaseRepository.interface";

export interface ICategoryRepositoryInterface
  extends IBaseRepositoryInterface<ICategoryModel> {
  findExcludingId(
    excludeId: string,
    value: string,
  ): Promise<ICategoryModel | null>;

  findAllCategoryNames(): Promise<{ _id: string; categoryName: string }[]>;
}
