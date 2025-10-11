import { injectable } from "tsyringe";
import { IAdminModel } from "../../frameworks/database/mongo/models/admin.model";
import { AdminResponseDTO } from "../dtos/response.dto";

@injectable()
export class AdminMapper {
  toDTO(data: IAdminModel): AdminResponseDTO {
    console.log("data for mapping: ", data);
    return {
      _id: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      isBlocked: data.isBlocked,
      role: data.role,
    };
  }
}
