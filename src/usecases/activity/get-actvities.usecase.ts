import { inject, injectable } from "tsyringe";
import { IGetActivitiesUsecase } from "../../entities/usecaseInterfaces/activity/get-activities.usecase.interface";
import { IActivityRepository } from "../../entities/repositoryInterfaces/activity/activityRepository.interface";
import { ICacheService } from "../../entities/serviceInterfaces/cache-service.interface";
import { ActivityResponseDTO } from "../../shared/dtos/response.dto";
import { IActivityModel } from "../../frameworks/database/mongo/models/activity.model";
import mongoose, { FilterQuery } from "mongoose";
import { IActivityMapper } from "../../entities/mapperInterfaces/activitiy-mapper.interface";

@injectable()
export class GetActivitiesUsecase implements IGetActivitiesUsecase {
  constructor(
    @inject("IActivityRepository")
    private _activityRepository: IActivityRepository,

    @inject("ICacheService")
    private _cacheService: ICacheService,

    @inject("IActivityMapper")
    private _activityMapper: IActivityMapper,
  ) {}

  async execute(
    limit: number,
    skip: number,
    search: string,
    filter: string,
    id?: string,
  ): Promise<{ items: ActivityResponseDTO[]; total: number }> {
    const filterObject: FilterQuery<object> = {
      isActive: filter,
    };
    // const cacheKey = `activity:${skip / limit + 1}:${limit}:${search}`;
    // const cached = await this._cacheService.get(cacheKey);
    if (search.trim().length > 0) {
      filterObject.activityName = { $regex: search, $options: "i" };
    }

    if (id) {
      filterObject.userId = new mongoose.Types.ObjectId(id);
    }
    // if (cached)
    //   return cached as { items: ActivityResponseDTO[]; total: number };
    const activities = await this._activityRepository.findAll(
      limit,
      skip,
      filterObject,
    );

    const mappedActivity = this._activityMapper.toDTOs(
      activities.items as IActivityModel[],
    );

    // await this._cacheService.set(cacheKey, activities, 120);

    return { items: mappedActivity, total: activities.total };
  }
}
