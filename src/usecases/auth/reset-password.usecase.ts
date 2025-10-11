import { inject, injectable } from "tsyringe";
import { IResetPasswordUseCase } from "../../entities/usecaseInterfaces/auth/reset-password.usecase.interface";
import { IUserRepository } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IJwtservice } from "../../entities/serviceInterfaces/jwt-services.interface";
import { IBcrypt } from "../../entities/security/bcrypt.interface";
import { IAdminRepository } from "../../entities/repositoryInterfaces/users/admin-repository.inteface";
import { IHostRepository } from "../../entities/repositoryInterfaces/users/host-repository.interface";
import { UserMapper } from "../../shared/mappers/user.mapper";
import { HostMapper } from "../../shared/mappers/host.mapper";
import {
  HostResponseDTO,
  UserResponseDTO,
} from "../../shared/dtos/response.dto";
import { IAdminModel } from "../../frameworks/database/mongo/models/admin.model";
import { HttpStatusCode, ROLE } from "../../shared/constants/constants";
import { IUserModel } from "../../frameworks/database/mongo/models/user.model";
import { IHostModel } from "../../frameworks/database/mongo/models/host.model";
import { AppError } from "../../shared/errors/appError";

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

    if (role === ROLE.USER) {
      repository = this._userRepository;
    } else if (role === ROLE.HOST) {
      repository = this._hostRepository;
    } else {
      repository = this._adminRepository;
    }

    const user = await repository.findOne({ _id: id });

    if (!user) {
      throw new AppError("invalid user1", HttpStatusCode.NOT_FOUND);
    }

    const payload = this._jwtService.verifyToken(token);

    if (user.email !== payload.email) {
      throw new AppError("user validation error", HttpStatusCode.NOT_FOUND);
    }

    const hashedPassword = await this._bcryptService.hash(password);

    const updatedUser = await repository.findOneAndUpdate(
      { _id: user._id },
      { password: hashedPassword },
    );

    if (updatedUser?.role === ROLE.USER) {
      return this._userMapper.toDTO(updatedUser as IUserModel);
    }

    if (updatedUser?.role === ROLE.HOST) {
      return this._hostMapper.toDTO(updatedUser as IHostModel);
    }

    return updatedUser;
  }
}
