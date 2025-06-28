import { inject, injectable } from "tsyringe";
import { ILoginUserInterface } from "../../entities/usecaseInterfaces/auth/login-user.usecase.interface";
import { LoginUserDTO } from "../../shared/dtos/Auth.dto";
import { IUserRepositoryInterface } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IBcrypt } from "../../entities/security/bcrypt.interface";
import { IUserModel } from "../../frameworks/database/mongo/models/user.model";
import { IAdminRepositoryInterface } from "../../entities/repositoryInterfaces/users/admin-repository.inteface";
import { IAdminModel } from "../../frameworks/database/mongo/models/admin.model";
import { IHostRepositoryInterface } from "entities/repositoryInterfaces/users/host-repository.interface";
import { IHostModel } from "frameworks/database/mongo/models/host.model";

@injectable()
export class LoginUsecase implements ILoginUserInterface {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepositoryInterface,

    @inject("IAdminRepository")
    private _adminRepository: IAdminRepositoryInterface,

    @inject("IHostRepository")
    private _hostRepository: IHostRepositoryInterface,

    @inject("IPasswordBcrypt")
    private _passwordBcrypt: IBcrypt,
  ) {}

  async execute(
    data: LoginUserDTO,
  ): Promise<IUserModel | IAdminModel | IHostModel | undefined> {
    try {
      const { role } = data;
      let repository;
      if (role === "user") {
        repository = this._userRepository;
      } else if (role === "admin") {
        repository = this._adminRepository;
      } else if (role === "host") {
        repository = this._hostRepository;
      } else {
        throw new Error("invalid role");
      }
      const user = await repository.findOne({ email: data.email });
      if (!user) {
        throw new Error("User not found");
      }

      if (user.password) {
        const isValidPassword = await this._passwordBcrypt.compare(
          data.password,
          user.password,
        );
        if (!isValidPassword) throw new Error("Invalid password");
      }

      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
