import { ClientSession, FilterQuery } from "mongoose";

export interface IBaseRepository<T> {
  find(filter: FilterQuery<object>, session?: ClientSession): Promise<T[]>;
  findAll(
    limit: number,
    skip: number,
    filter: FilterQuery<object>,
  ): Promise<{ items: object[]; total: number }>;
  findOne(
    filter: FilterQuery<object>,
    session?: ClientSession,
  ): Promise<T | null>;
  findById(
    filter: FilterQuery<object>,
    session?: ClientSession,
  ): Promise<T | null>;
  save(data: Partial<T>, session?: ClientSession): Promise<T>;
  findOneAndUpdate(
    filte: FilterQuery<object>,
    value: object,
    session?: ClientSession,
  ): Promise<T | null>;
  delete(filter: FilterQuery<object>, session?: ClientSession): Promise<void>;
  countDocuments(
    filter: FilterQuery<object>,
    session?: ClientSession,
  ): Promise<number>;
  findDetailsWithProjection(
    filter: FilterQuery<object>,
    projection: FilterQuery<object>,
    session: ClientSession,
  ): Promise<object>;
  isNameExist(
    field: string,
    name: string,
    session?: ClientSession,
  ): Promise<boolean>;
}
