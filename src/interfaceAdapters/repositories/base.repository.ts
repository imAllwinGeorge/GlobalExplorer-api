import { FilterQuery, Model } from "mongoose";
import { IBaseRepository } from "../../entities/repositoryInterfaces/IBaseRepository.interface";

export class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected model: Model<T>) {}

  async find(filter: FilterQuery<object>): Promise<T[]> {
    return this.model.find(filter);
  }

  async findAll(limit: number, skip: number, filter: FilterQuery<object>) {
    const [items, total] = await Promise.all([
      this.model.find(filter).skip(skip).limit(limit).lean() as Promise<
        object[]
      >,
      this.model.countDocuments(filter),
    ]);
    return { items, total };
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

  async delete(filter: FilterQuery<object>): Promise<void> {
    await this.model.findOneAndDelete(filter).lean();
  }
  async countDocuments(filter: FilterQuery<T>) {
    {
      return this.model.countDocuments(filter);
    }
  }
}
