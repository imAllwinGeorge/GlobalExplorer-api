import { IHostRepository } from "entities/repositoryInterfaces/users/host-repository.interface";
import { IUserRepository } from "entities/repositoryInterfaces/users/user-repository.interface";
import { IGetUserUsecase } from "entities/usecaseInterfaces/user/get-user.usecase.interface";
import { HostResponseDTO, UserResponseDTO } from "shared/dtos/response.dto";
import { HostMapper } from "shared/mappers/host.mapper";
import { UserMapper } from "shared/mappers/user.mapper";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetUserUsecase implements IGetUserUsecase {
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
    role: string,
  ): Promise<HostResponseDTO | UserResponseDTO> {
    let user;
    if (role === "user") {
      user = await this._userRepository.findById({ _id });
      if (!user) throw new Error(" User not found!");
      return this._userMapper.toDTO(user);
    } else if (role === "host") {
      user = await this._hostRepository.findById({ _id });
      if (!user) throw new Error("Host not found!");
      return this._hostMapper.toDTO(user);
    }

    throw new Error("Invalid request");
  }
}
