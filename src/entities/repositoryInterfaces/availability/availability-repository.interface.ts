import { FilterQuery } from "mongoose";
import { IAvailabilityModel } from "../../../frameworks/database/mongo/models/availability.model";
import { IBaseRepository } from "../IBaseRepository.interface";

export interface IAvailabilityRepository
  extends IBaseRepository<IAvailabilityModel> {
  findOrCreateOne(
    filter: FilterQuery<object>,
    value: object,
  ): Promise<IAvailabilityModel>;
}
