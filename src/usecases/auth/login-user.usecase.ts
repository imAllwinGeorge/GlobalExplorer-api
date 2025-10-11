import { inject, injectable } from "tsyringe";
import { ILoginUser } from "../../entities/usecaseInterfaces/auth/login-user.usecase.interface";
import { LoginUserDTO } from "../../shared/dtos/Auth.dto";
import { IUserRepository } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IBcrypt } from "../../entities/security/bcrypt.interface";
import { IAdminRepository } from "../../entities/repositoryInterfaces/users/admin-repository.inteface";
import { IHostRepository } from "../../entities/repositoryInterfaces/users/host-repository.interface";
import { UserMapper } from "../../shared/mappers/user.mapper";
import { HostMapper } from "../../shared/mappers/host.mapper";
import { AdminMapper } from "../../shared/mappers/admin.mapper";
import {
  AdminResponseDTO,
  HostResponseDTO,
  UserResponseDTO,
} from "../../shared/dtos/response.dto";
import { HttpStatusCode, ROLE } from "../../shared/constants/constants";
import { AppError } from "../../shared/errors/appError";

@injectable()
export class LoginUsecase implements ILoginUser {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepository,

    @inject("IAdminRepository")
    private _adminRepository: IAdminRepository,

    @inject("IHostRepository")
    private _hostRepository: IHostRepository,

    @inject("IPasswordBcrypt")
    private _passwordBcrypt: IBcrypt,

    @inject(UserMapper)
    private _userMapper: UserMapper,

    @inject(HostMapper)
    private _hostMapper: HostMapper,

    @inject(AdminMapper)
    private _adminMapper: AdminMapper,
  ) {}

  async execute(
    data: LoginUserDTO,
  ): Promise<UserResponseDTO | AdminResponseDTO | HostResponseDTO | undefined> {
    const { role } = data;

    let user;

    if (role === ROLE.USER) {
      user = await this._userRepository.findOne({ email: data.email });

      if (!user)
        throw new AppError("User not found!", HttpStatusCode.NOT_FOUND);

      if (user.password) {
        const isValidPassword = await this._passwordBcrypt.compare(
          data.password,
          user.password,
        );

        if (!isValidPassword)
          throw new AppError("Invalid password", HttpStatusCode.UNAUTHORIZED);
      }

      return this._userMapper.toDTO(user);
    }

    if (role === ROLE.ADMIN) {
      user = await this._adminRepository.findOne({ email: data.email });

      if (!user)
        throw new AppError("admin not found!", HttpStatusCode.NOT_FOUND);

      if (user.password) {
        const isValidPassword = await this._passwordBcrypt.compare(
          data.password,
          user.password,
        );

        if (!isValidPassword)
          throw new AppError("Invalid password", HttpStatusCode.UNAUTHORIZED);
      }
      const mappedUser = this._adminMapper.toDTO(user);
      console.log("mapped User: ", mappedUser);
      return mappedUser;
    }

    if (role === ROLE.HOST) {
      user = await this._hostRepository.findOne({ email: data.email });

      if (!user)
        throw new AppError("Host not found!", HttpStatusCode.NOT_FOUND);

      if (user.password) {
        const isValidPassword = await this._passwordBcrypt.compare(
          data.password,
          user.password,
        );

        if (!isValidPassword)
          throw new AppError("Invalid password", HttpStatusCode.UNAUTHORIZED);
      }

      if (!user.isVerified) {
        throw new AppError(
          "Verification is pending! please contact admin",
          HttpStatusCode.UNAUTHORIZED,
        );
      }

      return this._hostMapper.toDTO(user);
    }

    throw new AppError("invalid role", HttpStatusCode.NOT_FOUND);
  }
}
