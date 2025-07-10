import { IActivityRepositoryInterface } from "entities/repositoryInterfaces/activity/activityRepository.interface";
import { IEditActivityUsecaseInterface } from "entities/usecaseInterfaces/activity/edit-activity.usecase.interface";
import { IActivityModel } from "frameworks/database/mongo/models/activity.model";
import { inject, injectable } from "tsyringe";

@injectable()
export class EditActivityUsecase implements IEditActivityUsecaseInterface {
  constructor(
    @inject("IActivityRepository")
    private _actvityRepository: IActivityRepositoryInterface,
  ) {}

  async execute(id: string, data: object): Promise<IActivityModel> {
    console.log(" edit activituy usecase id            ", id);

    const activity = await this._actvityRepository.findOneAndUpdate(
      { _id: id },
      data,
    );
    console.log(" edit activity usecase            k", activity);
    if (!activity)
      throw new Error("cannot find the activity. Please try again");
    return activity;
  }
}
