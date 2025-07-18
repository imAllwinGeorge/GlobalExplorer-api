import { IBaseRepositoryInterface } from "../IBaseRepository.interface";
import { IActivityModel } from "frameworks/database/mongo/models/activity.model";

export interface IActivityRepositoryInterface
  extends IBaseRepositoryInterface<IActivityModel> {
  FilterActivity(
    limit: number,
    skip: number,
    filter: object,
  ): Promise<{ activities: IActivityModel[]; totalPages: number }>;
}
