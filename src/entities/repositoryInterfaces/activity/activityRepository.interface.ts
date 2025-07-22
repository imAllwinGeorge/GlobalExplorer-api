import { IBaseRepository } from "../IBaseRepository.interface";
import { IActivityModel } from "frameworks/database/mongo/models/activity.model";

export interface IActivityRepository extends IBaseRepository<IActivityModel> {
  FilterActivity(
    limit: number,
    skip: number,
    filter: object,
  ): Promise<{ activities: IActivityModel[]; totalPages: number }>;
}
