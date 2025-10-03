import { IAdminModel } from "frameworks/database/mongo/models/admin.model";
import { HostResponseDTO, UserResponseDTO } from "shared/dtos/response.dto";

export interface IResetPasswordUseCase {
  execute(
    id: string,
    role: string,
    token: string,
    password: string,
  ): Promise<UserResponseDTO | HostResponseDTO | IAdminModel | null>;
}
