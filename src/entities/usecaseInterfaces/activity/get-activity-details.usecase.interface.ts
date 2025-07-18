import { IActivityModel } from "frameworks/database/mongo/models/activity.model";

export interface IGetActivityDetailsUsecaseInterface {
  execute(
    id: string,
  ): Promise<{ activity: IActivityModel; razorpayAccountId: string }>;
}
