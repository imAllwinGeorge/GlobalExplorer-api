import { IActivityModel } from "../../frameworks/database/mongo/models/activity.model";
import { ActivityDTO } from "../../shared/dtos/Auth.dto";
import { ActivityResponseDTO } from "../../shared/dtos/response.dto";

export interface IActivityMapper {
  toEntity(dto: ActivityDTO): Partial<IActivityModel>;
  toDTO(activity: IActivityModel): ActivityResponseDTO;
  toDTOs(entities: IActivityModel[]): ActivityResponseDTO[];
}
