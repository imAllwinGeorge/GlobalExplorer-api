import {
  AdminResponseDTO,
  HostResponseDTO,
  UserResponseDTO,
} from "../../../shared/dtos/response.dto";

export interface IVerifyTokenUsecase {
  execute(
    token: string,
    tole: string,
  ): Promise<AdminResponseDTO | HostResponseDTO | UserResponseDTO>;
}
