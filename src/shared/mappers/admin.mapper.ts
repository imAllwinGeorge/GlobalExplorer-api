import { IAdminModel } from "frameworks/database/mongo/models/admin.model";
import { AdminResponseDTO } from "shared/dtos/response.dto";
import { injectable } from "tsyringe";

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
