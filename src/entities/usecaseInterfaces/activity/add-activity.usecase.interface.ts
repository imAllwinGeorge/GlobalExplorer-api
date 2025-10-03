import { ActivityDTO } from "shared/dtos/Auth.dto";
import { ActivityResponseDTO } from "shared/dtos/response.dto";

export interface IAddActivityUsecase {
  execute(data: ActivityDTO): Promise<ActivityResponseDTO>;
}
