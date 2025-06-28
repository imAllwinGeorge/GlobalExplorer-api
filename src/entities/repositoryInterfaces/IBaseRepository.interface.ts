import { FilterQuery } from "mongoose";

export interface IBaseRepositoryInterface<T> {
  find(filter: FilterQuery<object>): Promise<T[]>;
  findOne(filter: FilterQuery<object>): Promise<T | null>;
  findById(filter: FilterQuery<object>): Promise<T | null>;
  save(data: Partial<T>): Promise<T>;
  findOneAndUpdate(
    filte: FilterQuery<object>,
    value: object,
  ): Promise<T | null>;
}
