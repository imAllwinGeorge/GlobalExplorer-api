import { IActivityModel } from "../../../frameworks/database/mongo/models/activity.model";
import { ActivityResponseDTO } from "../../../shared/dtos/response.dto";

export interface IUpdateDynamicPricingUsecase {
  execute(
    activityId: string,
    data: Partial<IActivityModel>,
  ): Promise<ActivityResponseDTO>;
}
