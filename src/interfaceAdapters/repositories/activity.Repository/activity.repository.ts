import { injectable } from "tsyringe";
import { BaseRepository } from "../base.repository";

import { FilterQuery } from "mongoose";
import {
  ActivityModel,
  IActivityModel,
} from "../../../frameworks/database/mongo/models/activity.model";
import { IActivityRepository } from "../../../entities/repositoryInterfaces/activity/activityRepository.interface";
import { Filter } from "../../../shared/types/types";

@injectable()
export class ActivityRepository
  extends BaseRepository<IActivityModel>
  implements IActivityRepository
{
  constructor() {
    super(ActivityModel);
  }

  async FilterActivity(
    limit: number,
    skip: number,
    filter: Filter,
  ): Promise<{ activities: IActivityModel[]; totalPages: number }> {
    const query: FilterQuery<IActivityModel> = {};
    if (filter.search) {
      query.$text = { $search: filter.search };
    }
    if (filter.category) {
      query.categoryId = filter.category;
    }
    if (filter.lat && filter.lng && filter.distance) {
      const earthRadiusInMeters = 6378100;
      const maxDistanceInRadians = filter.distance / earthRadiusInMeters;
      console.log(maxDistanceInRadians);
      query.location = {
        $geoWithin: {
          $centerSphere: [[filter.lng, filter.lat], maxDistanceInRadians],
        },
      };
    }
    if (filter.priceRangeMax && filter.priceRangeMin) {
      query.price = {
        $gte: filter.priceRangeMin,
        $lte: filter.priceRangeMax,
      };
    }
    const activities = await this.model.find(query).skip(skip).limit(limit);
    const total = await this.model.countDocuments(query);

    return { activities, totalPages: Math.ceil(total / limit) };
  }
}
