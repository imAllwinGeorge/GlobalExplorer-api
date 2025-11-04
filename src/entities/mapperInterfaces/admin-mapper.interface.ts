import { IAdminModel } from "../../frameworks/database/mongo/models/admin.model";
import { AdminResponseDTO } from "../../shared/dtos/response.dto";

export interface IAdminMapper {
  toDTO(data: IAdminModel): AdminResponseDTO;
}
