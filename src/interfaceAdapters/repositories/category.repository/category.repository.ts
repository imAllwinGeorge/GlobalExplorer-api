import { BaseRepository } from "../base.repository";
import { injectable } from "tsyringe";
import { ICategoryRepositoryInterface } from "entities/repositoryInterfaces/category/categoryRepository.interface";
import {
  CategoryModel,
  ICategoryModel,
} from "frameworks/database/mongo/models/category.model";

@injectable()
export class CategoryRepository
  extends BaseRepository<ICategoryModel>
  implements ICategoryRepositoryInterface
{
  constructor() {
    super(CategoryModel);
  }

  async findExcludingId(
    excludeId: string,
    value: string,
  ): Promise<ICategoryModel | null> {
    return this.model.findOne({ _id: { $ne: excludeId }, CategoryName: value });
  }
}
