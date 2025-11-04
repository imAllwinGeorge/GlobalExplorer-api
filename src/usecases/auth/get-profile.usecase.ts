import { inject, injectable } from "tsyringe";
import { IGetProfileUsecase } from "../../entities/usecaseInterfaces/auth/get-profile.usecase.interface";
import { IUserRepository } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IHostRepository } from "../../entities/repositoryInterfaces/users/host-repository.interface";
import { IAdminRepository } from "../../entities/repositoryInterfaces/users/admin-repository.inteface";
import {
  AdminResponseDTO,
  HostResponseDTO,
  UserResponseDTO,
} from "../../shared/dtos/response.dto";
import { HttpStatusCode, ROLE } from "../../shared/constants/constants";
import { AppError } from "../../shared/errors/appError";
import { IUserMapper } from "../../entities/mapperInterfaces/user-mapper.interface";
import { IHostMapper } from "../../entities/mapperInterfaces/host-mapper.interface";
import { IAdminMapper } from "../../entities/mapperInterfaces/admin-mapper.interface";

@injectable()
export class GetProfileUsecase implements IGetProfileUsecase {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepository,

    @inject("IHostRepository")
    private _hostRepository: IHostRepository,

    @inject("IAdminRepository")
    private _adminRepository: IAdminRepository,

    @inject("IUserMapper")
    private _userMapper: IUserMapper,

    @inject("IHostMapper")
    private _hostMapper: IHostMapper,

    @inject("IAdminMapper")
    private _adminMapper: IAdminMapper,
  ) {}

  async execute(
    id: string,
    role: string,
  ): Promise<UserResponseDTO | HostResponseDTO | AdminResponseDTO> {
    let profile;

    if (role === ROLE.USER) {
      profile = await this._userRepository.findOne({ _id: id });
      if (!profile)
        throw new AppError("Profile not found!", HttpStatusCode.NOT_FOUND);
      return this._userMapper.toDTO(profile);
    }

    if (role === ROLE.HOST) {
      profile = await this._hostRepository.findOne({ _id: id });
      if (!profile)
        throw new AppError("Profile not found!", HttpStatusCode.NOT_FOUND);
      return this._hostMapper.toDTO(profile);
    }

    if (role === ROLE.ADMIN) {
      profile = await this._adminRepository.findOne({ _id: id });
      if (!profile)
        throw new AppError("Profile not found!", HttpStatusCode.NOT_FOUND);
      return this._adminMapper.toDTO(profile);
    }

    throw new AppError("Invalid role", HttpStatusCode.NOT_FOUND);
  }
}
