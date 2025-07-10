import { IActivityRepositoryInterface } from "entities/repositoryInterfaces/activity/activityRepository.interface";
import {
  ActivityModel,
  IActivityModel,
} from "frameworks/database/mongo/models/activity.model";
import { injectable } from "tsyringe";
import { BaseRepository } from "../base.repository";

@injectable()
export class ActivityRepository
  extends BaseRepository<IActivityModel>
  implements IActivityRepositoryInterface
{
  constructor() {
    super(ActivityModel);
  }
}
