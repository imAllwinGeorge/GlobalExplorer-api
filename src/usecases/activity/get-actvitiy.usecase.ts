import { inject, injectable } from "tsyringe";
import { IGetActivityUsecase } from "../../entities/usecaseInterfaces/activity/get-activity.usecase.interface";
import { IActivityRepository } from "../../entities/repositoryInterfaces/activity/activityRepository.interface";
import { ICacheService } from "../../entities/serviceInterfaces/cache-service.interface";
import { ActivityMapper } from "../../shared/mappers/activity.mapper";
import { ActivityResponseDTO } from "../../shared/dtos/response.dto";
import { IActivityModel } from "../../frameworks/database/mongo/models/activity.model";

@injectable()
export class GetActivityUsecase implements IGetActivityUsecase {
  constructor(
    @inject("IActivityRepository")
    private _activityRepository: IActivityRepository,

    @inject("ICacheService")
    private _cacheService: ICacheService,

    @inject(ActivityMapper)
    private _activityMapper: ActivityMapper,
  ) {}

  async execute(
    limit: number,
    skip: number,
    value: object,
  ): Promise<{ items: ActivityResponseDTO[]; total: number }> {
    const cacheKey = `activity:${skip / limit + 1}:${limit}`;
    const cached = await this._cacheService.get(cacheKey);
    console.log("cached result", cached);

    if (cached)
      return cached as { items: ActivityResponseDTO[]; total: number };
    const activities = await this._activityRepository.findAll(
      limit,
      skip,
      value,
    );

    const mappedActivity = this._activityMapper.toDTOs(
      activities.items as IActivityModel[],
    );

    console.log("foingionwoowgbgsogosj,", value);

    await this._cacheService.set(cacheKey, activities, 120);

    return { items: mappedActivity, total: activities.total };
  }
}
