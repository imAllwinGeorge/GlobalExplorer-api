import { ActivityDTO } from "shared/dtos/Auth.dto";
import { Filter } from "shared/types/types";

export interface IGetFilteredAcitivityUsecase {
  execute(
    limit: number,
    skip: number,
    filter: Filter,
  ): Promise<{ activities: ActivityDTO[]; totalPages: number }>;
}
