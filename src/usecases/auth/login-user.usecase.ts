import { inject, injectable } from "tsyringe";
import { ILoginUser } from "../../entities/usecaseInterfaces/auth/login-user.usecase.interface";
import { LoginUserDTO } from "../../shared/dtos/Auth.dto";
import { IUserRepository } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IBcrypt } from "../../entities/security/bcrypt.interface";
import { IAdminRepository } from "../../entities/repositoryInterfaces/users/admin-repository.inteface";
import { IHostRepository } from "entities/repositoryInterfaces/users/host-repository.interface";
import {
  AdminResponseDTO,
  HostResponseDTO,
  UserResponseDTO,
} from "shared/dtos/response.dto";
import { HostMapper } from "shared/mappers/host.mapper";
import { UserMapper } from "shared/mappers/user.mapper";
import { AdminMapper } from "shared/mappers/admin.mapper";

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
    try {
      const { role } = data;
      let user;
      if (role === "user") {
        user = await this._userRepository.findOne({ email: data.email });
        if (!user) throw new Error("User not found!");
        if (user.password) {
          const isValidPassword = await this._passwordBcrypt.compare(
            data.password,
            user.password,
          );
          if (!isValidPassword) throw new Error("Invalid password");
        }
        return this._userMapper.toDTO(user);
      }
      if (role === "admin") {
        user = await this._adminRepository.findOne({ email: data.email });
        if (!user) throw new Error("admin not found!");
        if (user.password) {
          const isValidPassword = await this._passwordBcrypt.compare(
            data.password,
            user.password,
          );
          if (!isValidPassword) throw new Error("Invalid password");
        }
        return this._adminMapper.toDTO(user);
      }
      if (role === "host") {
        user = await this._hostRepository.findOne({ email: data.email });
        if (!user) throw new Error("Host not found!");
        if (user.password) {
          const isValidPassword = await this._passwordBcrypt.compare(
            data.password,
            user.password,
          );
          if (!isValidPassword) throw new Error("Invalid password");
        }
        return this._hostMapper.toDTO(user);
      }

      throw new Error("invalid role");
    } catch (error) {
      console.log(error);
    }
  }
}
