import { IActivityRepositoryInterface } from "entities/repositoryInterfaces/activity/activityRepository.interface";
import { IAddActivityUsecaseInterface } from "entities/usecaseInterfaces/activity/add-activity.usecase.interface";
import { IActivityModel } from "frameworks/database/mongo/models/activity.model";
import { ActivityDTO } from "shared/dtos/Auth.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class AddActivityUsecase implements IAddActivityUsecaseInterface {
  constructor(
    @inject("IActivityRepository")
    private _activityRepository: IActivityRepositoryInterface,
  ) {}

  async execute(data: ActivityDTO): Promise<IActivityModel> {
    const activity = await this._activityRepository.save(data);
    return activity;
  }
}
