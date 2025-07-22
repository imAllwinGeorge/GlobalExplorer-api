import { IActivityModel } from "frameworks/database/mongo/models/activity.model";

export interface IGetActivityDetailsUsecase {
  execute(
    id: string,
  ): Promise<{ activity: IActivityModel; razorpayAccountId: string }>;
}
