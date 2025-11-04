import { EditActivityDTO } from "../../../shared/dtos/edit.dto";
import { ActivityResponseDTO } from "../../../shared/dtos/response.dto";

export interface IEditActivityUsecase {
  execute(id: string, data: EditActivityDTO): Promise<ActivityResponseDTO>;
}
