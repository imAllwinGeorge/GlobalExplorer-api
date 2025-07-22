import { IActivityRepository } from "entities/repositoryInterfaces/activity/activityRepository.interface";
import { IAddActivityUsecase } from "entities/usecaseInterfaces/activity/add-activity.usecase.interface";
import { IActivityModel } from "frameworks/database/mongo/models/activity.model";
import { ActivityDTO } from "shared/dtos/Auth.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class AddActivityUsecase implements IAddActivityUsecase {
  constructor(
    @inject("IActivityRepository")
    private _activityRepository: IActivityRepository,
  ) {}

  async execute(data: ActivityDTO): Promise<IActivityModel> {
    const activity = await this._activityRepository.save(data);
    return activity;
  }
}
