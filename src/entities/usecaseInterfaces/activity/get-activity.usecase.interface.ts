import { ActivityResponseDTO } from "../../../shared/dtos/response.dto";

export interface IGetActivityUsecase {
  execute(
    limit: number,
    skip: number,
    value: object,
  ): Promise<{ items: ActivityResponseDTO[]; total: number }>;
}
