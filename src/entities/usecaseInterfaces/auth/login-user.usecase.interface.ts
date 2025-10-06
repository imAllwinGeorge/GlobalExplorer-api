import { LoginUserDTO } from "../../../shared/dtos/Auth.dto";
import {
  AdminResponseDTO,
  HostResponseDTO,
  UserResponseDTO,
} from "../../../shared/dtos/response.dto";

export interface ILoginUser {
  execute(
    data: LoginUserDTO,
  ): Promise<UserResponseDTO | AdminResponseDTO | HostResponseDTO | undefined>;
}
