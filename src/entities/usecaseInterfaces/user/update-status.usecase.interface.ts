import {
  HostResponseDTO,
  UserResponseDTO,
} from "../../../shared/dtos/response.dto";

export interface IUpdateStatusUsecase {
  execute(
    id: string,
    value: object,
    role: string,
  ): Promise<UserResponseDTO | HostResponseDTO>;
}
