import { injectable } from "tsyringe";
import { IAvailabilityRepository } from "../../../entities/repositoryInterfaces/availability/availability-repository.interface";
import {
  AvailabilityModel,
  IAvailabilityModel,
} from "../../../frameworks/database/mongo/models/availability.model";
import { BaseRepository } from "../base.repository";
import { FilterQuery } from "mongoose";

@injectable()
export class AvailabilityRepository
  extends BaseRepository<IAvailabilityModel>
  implements IAvailabilityRepository
{
  constructor() {
    super(AvailabilityModel);
  }

  async findOrCreateOne(
    filter: FilterQuery<object>,
    value: object,
  ): Promise<IAvailabilityModel> {
    return this.model.findOneAndUpdate(filter, value, {
      upsert: true,
      new: true,
    });
  }
}
