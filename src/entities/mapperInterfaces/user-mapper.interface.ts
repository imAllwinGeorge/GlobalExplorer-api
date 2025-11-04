import { IUserModel } from "../../frameworks/database/mongo/models/user.model";
import { UserResponseDTO } from "../../shared/dtos/response.dto";

export interface IUserMapper {
  toDTO(user: IUserModel): UserResponseDTO;
  toDTOs(entities: IUserModel[]): UserResponseDTO[];
}
