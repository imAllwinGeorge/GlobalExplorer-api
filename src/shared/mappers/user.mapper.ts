import { injectable } from "tsyringe";
import { IUserModel } from "../../frameworks/database/mongo/models/user.model";
import { UserResponseDTO } from "../dtos/response.dto";

@injectable()
export class UserMapper {
  toDTO(user: IUserModel): UserResponseDTO {
    return {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      isBlocked: user.isBlocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  toDTOs(entities: IUserModel[]): UserResponseDTO[] {
    return entities.map((entity) => this.toDTO(entity));
  }
}
