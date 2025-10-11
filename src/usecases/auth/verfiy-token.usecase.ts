import { inject, injectable } from "tsyringe";
import { IVerifyTokenUsecase } from "../../entities/usecaseInterfaces/auth/verify-token.usecase.interface";
import { IJwtservice } from "../../entities/serviceInterfaces/jwt-services.interface";
import { IUserRepository } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IAdminRepository } from "../../entities/repositoryInterfaces/users/admin-repository.inteface";
import { IUserModel } from "../../frameworks/database/mongo/models/user.model";
import { IAdminModel } from "../../frameworks/database/mongo/models/admin.model";
import { IHostRepository } from "../../entities/repositoryInterfaces/users/host-repository.interface";
import { IHostModel } from "../../frameworks/database/mongo/models/host.model";
import { HttpStatusCode, ROLE } from "../../shared/constants/constants";
import { AppError } from "../../shared/errors/appError";
import {
  AdminResponseDTO,
  HostResponseDTO,
  UserResponseDTO,
} from "../../shared/dtos/response.dto";
import { UserMapper } from "../../shared/mappers/user.mapper";
import { HostMapper } from "../../shared/mappers/host.mapper";
import { AdminMapper } from "../../shared/mappers/admin.mapper";

@injectable()
export class VerifyTokenUsecase implements IVerifyTokenUsecase {
  constructor(
    @inject("IJwtService")
    private _tokenService: IJwtservice,

    @inject("IUserRepository")
    private _UserRepository: IUserRepository,

    @inject("IAdminRepository")
    private _adminRepository: IAdminRepository,

    @inject("IHostRepository")
    private _hostRepository: IHostRepository,

    @inject(UserMapper)
    private _userMapper: UserMapper,

    @inject(HostMapper)
    private _hostMapper: HostMapper,

    @inject(AdminMapper)
    private _adminMapper: AdminMapper,
  ) {}
  async execute(
    token: string,
    role: string,
  ): Promise<AdminResponseDTO | HostResponseDTO | UserResponseDTO> {
    const decode = this._tokenService.verifyToken(token);

    let user;

    if (role === ROLE.USER) {
      user = await this._UserRepository.findOne({ email: decode.email });

      return this._userMapper.toDTO(user as unknown as IUserModel);
    } else if (role === ROLE.ADMIN) {
      user = await this._adminRepository.findOne({ email: decode.email });

      return this._adminMapper.toDTO(user as unknown as IAdminModel);
    } else if (role === ROLE.HOST) {
      user = await this._hostRepository.findOne({ email: decode.email });

      return this._hostMapper.toDTO(user as unknown as IHostModel);
    } else {
      throw new AppError("session Expired", HttpStatusCode.UNAUTHORIZED);
    }
  }
}
