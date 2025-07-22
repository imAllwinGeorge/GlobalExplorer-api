import { IActivityRepository } from "entities/repositoryInterfaces/activity/activityRepository.interface";
import { IGetActivityUsecase } from "entities/usecaseInterfaces/activity/get-activity.usecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetActivityUsecase implements IGetActivityUsecase {
  constructor(
    @inject("IActivityRepository")
    private _activityRepository: IActivityRepository,
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
