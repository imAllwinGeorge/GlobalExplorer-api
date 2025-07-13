import { FilterQuery } from "mongoose";

export interface IBaseRepositoryInterface<T> {
  find(filter: FilterQuery<object>): Promise<T[]>;
  findAll(
    limit: number,
    skip: number,
    filter: FilterQuery<object>,
  ): Promise<{ items: object[]; total: number }>;
  findOne(filter: FilterQuery<object>): Promise<T | null>;
  findById(filter: FilterQuery<object>): Promise<T | null>;
  save(data: Partial<T>): Promise<T>;
  findOneAndUpdate(
    filte: FilterQuery<object>,
    value: object,
  ): Promise<T | null>;
  delete(filter: FilterQuery<object>): Promise<void>;
  countDocuments(filter: FilterQuery<object>): Promise<number>;
}
