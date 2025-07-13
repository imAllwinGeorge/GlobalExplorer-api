import { IActivityRepositoryInterface } from "entities/repositoryInterfaces/activity/activityRepository.interface";
import { IGetActivityDetailsUsecaseInterface } from "entities/usecaseInterfaces/activity/get-activity-details.usecase.interface";
import { IActivityModel } from "frameworks/database/mongo/models/activity.model";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetActivityDetailsUsecase
  implements IGetActivityDetailsUsecaseInterface
{
  constructor(
    @inject("IActivityRepository")
    private _activityRepository: IActivityRepositoryInterface,
  ) {}

  async execute(id: string): Promise<IActivityModel> {
    const activity = await this._activityRepository.findOne({ _id: id });
    if (!activity) throw new Error("Failed to fetch actvity details");
    return activity;
  }
}
