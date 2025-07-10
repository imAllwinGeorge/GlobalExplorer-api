import { IActivityRepositoryInterface } from "entities/repositoryInterfaces/activity/activityRepository.interface";
import { IGetActivityUsecaseInterface } from "entities/usecaseInterfaces/activity/get-activity.usecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetActivityUsecase implements IGetActivityUsecaseInterface {
  constructor(
    @inject("IActivityRepository")
    private _activityRepository: IActivityRepositoryInterface,
  ) {}

  async execute(
    limit: number,
    skip: number,
    value: object,
  ): Promise<{ items: object[]; total: number }> {
    const activities = this._activityRepository.findAll(limit, skip, value);
    console.log("foingionwoowgbgsogosj,", value);
    return activities;
  }
}
