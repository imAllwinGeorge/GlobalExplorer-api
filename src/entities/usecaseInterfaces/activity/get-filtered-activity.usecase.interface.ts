import { IActivityModel } from "frameworks/database/mongo/models/activity.model";
import { Filter } from "shared/types/types";

export interface IGetFilteredAcitivityUsecaseInterface {
  execute(
    limit: number,
    skip: number,
    filter: Filter,
  ): Promise<{ activities: IActivityModel[]; totalPages: number }>;
}
