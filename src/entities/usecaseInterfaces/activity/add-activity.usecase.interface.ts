import { IActivityModel } from "frameworks/database/mongo/models/activity.model";
import { ActivityDTO } from "shared/dtos/Auth.dto";

export interface IAddActivityUsecaseInterface {
  execute(data: ActivityDTO): Promise<IActivityModel>;
}
