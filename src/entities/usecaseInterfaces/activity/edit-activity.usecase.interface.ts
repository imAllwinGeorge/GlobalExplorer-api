import { IActivityModel } from "frameworks/database/mongo/models/activity.model";

export interface IEditActivityUsecase {
  execute(id: string, data: object): Promise<IActivityModel>;
}
