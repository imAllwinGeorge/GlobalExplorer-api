import { IActivityRepository } from "entities/repositoryInterfaces/activity/activityRepository.interface";
import { IGetFilteredAcitivityUsecase } from "entities/usecaseInterfaces/activity/get-filtered-activity.usecase.interface";
import { IActivityModel } from "frameworks/database/mongo/models/activity.model";
import { Filter } from "shared/types/types";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetFilteredActivityUsecase
  implements IGetFilteredAcitivityUsecase
{
  constructor(
    @inject("IActivityRepository")
    private _activityRepository: IActivityRepository,
  ) {}

  async execute(
    limit: number,
    skip: number,
    filter: Filter,
  ): Promise<{ activities: IActivityModel[]; totalPages: number }> {
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", filter);
    const result = await this._activityRepository.FilterActivity(
      limit,
      skip,
      filter,
    );
    return result;
  }
}
