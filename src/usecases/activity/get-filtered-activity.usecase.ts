import { IActivityRepository } from "entities/repositoryInterfaces/activity/activityRepository.interface";
import { IGetFilteredAcitivityUsecase } from "entities/usecaseInterfaces/activity/get-filtered-activity.usecase.interface";
import { ActivityResponseDTO } from "shared/dtos/response.dto";
import { ActivityMapper } from "shared/mappers/activity.mapper";
import { Filter } from "shared/types/types";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetFilteredActivityUsecase
  implements IGetFilteredAcitivityUsecase
{
  constructor(
    @inject("IActivityRepository")
    private _activityRepository: IActivityRepository,

    @inject(ActivityMapper)
    private _activityMapper: ActivityMapper,
  ) {}

  async execute(
    limit: number,
    skip: number,
    filter: Filter,
  ): Promise<{ activities: ActivityResponseDTO[]; totalPages: number }> {
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", filter);
    const result = await this._activityRepository.FilterActivity(
      limit,
      skip,
      filter,
    );
    const mappedActivities = this._activityMapper.toDTOs(result.activities);
    return {
      activities: mappedActivities,
      totalPages: result.totalPages,
    };
  }
}
