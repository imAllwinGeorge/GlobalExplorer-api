import { ActivityResponseDTO } from "../../../shared/dtos/response.dto";

export interface IGetActivityUsecase {
  execute(activityId: string): Promise<ActivityResponseDTO>;
}
