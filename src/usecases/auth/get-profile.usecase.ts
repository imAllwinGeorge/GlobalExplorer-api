import { IAdminRepository } from "entities/repositoryInterfaces/users/admin-repository.inteface";
import { IHostRepository } from "entities/repositoryInterfaces/users/host-repository.interface";
import { IUserRepository } from "entities/repositoryInterfaces/users/user-repository.interface";
import { IGetProfileUsecase } from "entities/usecaseInterfaces/auth/get-profile.usecase.interface";
import {
  AdminResponseDTO,
  HostResponseDTO,
  UserResponseDTO,
} from "shared/dtos/response.dto";
import { AdminMapper } from "shared/mappers/admin.mapper";
import { HostMapper } from "shared/mappers/host.mapper";
import { UserMapper } from "shared/mappers/user.mapper";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetProfileUsecase implements IGetProfileUsecase {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepository,

    @inject("IHostRepository")
    private _hostRepository: IHostRepository,

    @inject("IAdminRepository")
    private _adminRepository: IAdminRepository,

    @inject(UserMapper)
    private _userMapper: UserMapper,

    @inject(HostMapper)
    private _hostMapper: HostMapper,

    @inject(AdminMapper)
    private _adminMapper: AdminMapper,
  ) {}

  async execute(
    id: string,
    role: string,
  ): Promise<UserResponseDTO | HostResponseDTO | AdminResponseDTO> {
    let profile;
    if (role === "user") {
      profile = await this._userRepository.findOne({ _id: id });
      if (!profile) throw new Error("Profile not found!");
      return this._userMapper.toDTO(profile);
    }
    if (role === "host") {
      profile = await this._hostRepository.findOne({ _id: id });
      if (!profile) throw new Error("Profile not found!");
      return this._hostMapper.toDTO(profile);
    }
    if (role === "admin") {
      profile = await this._adminRepository.findOne({ _id: id });
      if (!profile) throw new Error("Profile not found!");
      return this._adminMapper.toDTO(profile);
    }

    throw new Error("Invalid role");
  }
}
