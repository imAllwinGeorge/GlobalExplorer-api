import { ICategoryRepository } from "../../../entities/repositoryInterfaces/category/categoryRepository.interface";
import {
  CategoryModel,
  ICategoryModel,
} from "../../../frameworks/database/mongo/models/category.model";
import { BaseRepository } from "../base.repository";
import { injectable } from "tsyringe";

@injectable()
export class CategoryRepository
  extends BaseRepository<ICategoryModel>
  implements ICategoryRepository
{
  constructor() {
    super(CategoryModel);
  }

  async findAllCategoryNames(): Promise<
    { _id: string; categoryName: string }[]
  > {
    return this.model.find({}, { _id: 1, categoryName: 1 });
  }
}
