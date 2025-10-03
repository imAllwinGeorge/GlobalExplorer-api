import { ActivityResponseDTO } from "shared/dtos/response.dto";

export interface IEditActivityUsecase {
  execute(id: string, data: object): Promise<ActivityResponseDTO>;
}
