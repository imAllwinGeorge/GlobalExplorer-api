import { inject, injectable } from "tsyringe";
import { IUpdateStatusUsecase } from "../../entities/usecaseInterfaces/user/update-status.usecase.interface";
import { IUserRepository } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IHostRepository } from "entities/repositoryInterfaces/users/host-repository.interface";
import { HostMapper } from "shared/mappers/host.mapper";
import { HostResponseDTO, UserResponseDTO } from "shared/dtos/response.dto";
import { UserMapper } from "shared/mappers/user.mapper";

@injectable()
export class UpdateStatusUsecase implements IUpdateStatusUsecase {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepository,

    @inject("IHostRepository")
    private _hostRepository: IHostRepository,

    @inject(UserMapper)
    private _userMapper: UserMapper,

    @inject(HostMapper)
    private _hostMapper: HostMapper,
  ) {}

  async execute(
    _id: string,
    value: object,
    role: string,
  ): Promise<UserResponseDTO | HostResponseDTO> {
    console.log("value for updating  ", value);
    let user;
    if (role === "user") {
      user = await this._userRepository.findOneAndUpdate({ _id }, value);
      if (!user) throw new Error("User status update failed!");
      return this._userMapper.toDTO(user);
    } else if (role === "host") {
      user = await this._hostRepository.findOneAndUpdate({ _id }, value);
      if (!user) throw new Error("User status update failed!");
      return this._hostMapper.toDTO(user);
    }
    throw new Error("invalid request");
  }
}
