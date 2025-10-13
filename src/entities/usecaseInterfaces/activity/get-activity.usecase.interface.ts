import { ActivityResponseDTO } from "../../../shared/dtos/response.dto";

export interface IGetActivityUsecase {
  execute(
    limit: number,
    skip: number,
    search: string,
    id?: string,
  ): Promise<{ items: ActivityResponseDTO[]; total: number }>;
}
