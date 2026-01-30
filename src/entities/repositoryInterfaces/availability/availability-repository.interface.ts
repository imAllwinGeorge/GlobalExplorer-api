import { ClientSession, FilterQuery } from "mongoose";
import { IAvailabilityModel } from "../../../frameworks/database/mongo/models/availability.model";
import { IBaseRepository } from "../IBaseRepository.interface";

export interface IAvailabilityRepository
  extends IBaseRepository<IAvailabilityModel> {
  findOrCreateOne(
    filter: FilterQuery<object>,
    value: object,
  ): Promise<IAvailabilityModel>;
  updateOne(
    filter: FilterQuery<object>,
    value: object,
    session?: ClientSession,
  ): Promise<IAvailabilityModel | null>;
}
