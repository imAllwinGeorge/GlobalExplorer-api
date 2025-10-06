import {
  HostResponseDTO,
  UserResponseDTO,
} from "../../../shared/dtos/response.dto";

export interface IGetUserUsecase {
  execute(
    _id: string,
    role: string,
  ): Promise<HostResponseDTO | UserResponseDTO>;
}
