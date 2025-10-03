import {
  AdminResponseDTO,
  HostResponseDTO,
  UserResponseDTO,
} from "shared/dtos/response.dto";

export interface IGetProfileUsecase {
  execute(
    id: string,
    role: string,
  ): Promise<UserResponseDTO | HostResponseDTO | AdminResponseDTO>;
}
