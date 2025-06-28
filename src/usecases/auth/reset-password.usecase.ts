import { inject, injectable } from "tsyringe";
import { IResetPasswordUseCaseInterface } from "../../entities/usecaseInterfaces/auth/reset-password.usecase.interface";
import { IUserRepositoryInterface } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IJwtserviceInterface } from "../../entities/serviceInterfaces/jwt-services.interface";
import { IBcrypt } from "../../entities/security/bcrypt.interface";
import { IUserModel } from "../../frameworks/database/mongo/models/user.model";
import { IAdminRepositoryInterface } from "entities/repositoryInterfaces/users/admin-repository.inteface";
import { IHostRepositoryInterface } from "entities/repositoryInterfaces/users/host-repository.interface";
import { IHostModel } from "frameworks/database/mongo/models/host.model";
import { IAdminModel } from "frameworks/database/mongo/models/admin.model";

@injectable()
export class ResetPasswordUsecase implements IResetPasswordUseCaseInterface {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepositoryInterface,

    @inject("IAdminRepository")
    private _adminRepository: IAdminRepositoryInterface,

    @inject("IHostRepository")
    private _hostRepository: IHostRepositoryInterface,

    @inject("IJwtService")
    private _jwtService: IJwtserviceInterface,

    @inject("IPasswordBcrypt")
    private _bcryptService: IBcrypt,
  ) {}
  async execute(
    id: string,
    role: string,
    token: string,
    password: string,
  ): Promise<IUserModel | IHostModel | IAdminModel | null> {
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
    console.log("1234567890   ", payload);
    if (user.email !== payload.email) {
      throw new Error("user validation error");
    }
    const hashedPassword = await this._bcryptService.hash(password);
    const updatedUser = await repository.findOneAndUpdate(
      { _id: user._id },
      { password: hashedPassword },
    );
    return updatedUser;
  }
}
