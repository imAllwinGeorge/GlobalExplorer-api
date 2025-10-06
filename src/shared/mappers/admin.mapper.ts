import { injectable } from "tsyringe";
import { IAdminModel } from "../../frameworks/database/mongo/models/admin.model";
import { AdminResponseDTO } from "../dtos/response.dto";

@injectable()
export class AdminMapper {
  toDTO(data: IAdminModel): AdminResponseDTO {
    return {
      _id: data._id,
      email: data.email,
      role: data.role,
      isBlocked: data.isBlocked,
    };
  }
}
