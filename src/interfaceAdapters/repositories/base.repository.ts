import { FilterQuery, Model } from "mongoose";
import { IBaseRepositoryInterface } from "../../entities/repositoryInterfaces/IBaseRepository.interface";

export class BaseRepository<T> implements IBaseRepositoryInterface<T> {
  constructor(protected model: Model<T>) {}

  async find(filter: FilterQuery<object>): Promise<T[]> {
    return this.model.find(filter);
  }

  async findOne(filter: FilterQuery<object>): Promise<T | null> {
    console.log(4);
    return this.model.findOne(filter);
  }

  async findById(filter: FilterQuery<object>): Promise<T | null> {
    return this.model.findById(filter);
  }

  async save(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findOneAndUpdate(
    filter: FilterQuery<object>,
    value: object,
  ): Promise<T | null> {
    return this.model.findOneAndUpdate(filter, { $set: value }, { new: true });
  }
}
