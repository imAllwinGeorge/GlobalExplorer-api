import { inject, injectable } from "tsyringe";
import { IResetPasswordUseCase } from "../../entities/usecaseInterfaces/auth/reset-password.usecase.interface";
import { IUserRepository } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IJwtservice } from "../../entities/serviceInterfaces/jwt-services.interface";
import { IBcrypt } from "../../entities/security/bcrypt.interface";
import { IAdminRepository } from "entities/repositoryInterfaces/users/admin-repository.inteface";
import { IHostRepository } from "entities/repositoryInterfaces/users/host-repository.interface";
import { IAdminModel } from "frameworks/database/mongo/models/admin.model";
import { HostResponseDTO, UserResponseDTO } from "shared/dtos/response.dto";
import { HostMapper } from "shared/mappers/host.mapper";
import { IHostModel } from "frameworks/database/mongo/models/host.model";
import { UserMapper } from "shared/mappers/user.mapper";
import { IUserModel } from "frameworks/database/mongo/models/user.model";

@injectable()
export class ResetPasswordUsecase implements IResetPasswordUseCase {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepository,

    @inject("IAdminRepository")
    private _adminRepository: IAdminRepository,

    @inject("IHostRepository")
    private _hostRepository: IHostRepository,

    @inject("IJwtService")
    private _jwtService: IJwtservice,

    @inject("IPasswordBcrypt")
    private _bcryptService: IBcrypt,

    @inject(UserMapper)
    private _userMapper: UserMapper,

    @inject(HostMapper)
    private _hostMapper: HostMapper,
  ) {}
  async execute(
    id: string,
    role: string,
    token: string,
    password: string,
  ): Promise<UserResponseDTO | HostResponseDTO | IAdminModel | null> {
    let repository;
    if (role === "user") {
      repository = this._userRepository;
    } else if (role === "host") {
      repository = this._hostRepository;
    } else {
      repository = this._adminRepository;
    }
    const user = await repository.findOne({ _id: id });
    if (!user) {
      throw new Error("invalid user1");
    }
    const payload = this._jwtService.verifyToken(token);
    if (user.email !== payload.email) {
      throw new Error("user validation error");
    }
    const hashedPassword = await this._bcryptService.hash(password);
    const updatedUser = await repository.findOneAndUpdate(
      { _id: user._id },
      { password: hashedPassword },
    );

    if (updatedUser?.role === "user") {
      return this._userMapper.toDTO(updatedUser as IUserModel);
    }

    if (updatedUser?.role === "host") {
      return this._hostMapper.toDTO(updatedUser as IHostModel);
    }
    return updatedUser;
  }
}
