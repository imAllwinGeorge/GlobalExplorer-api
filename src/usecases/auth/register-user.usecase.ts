import { inject, injectable } from "tsyringe";
import { IRegisterUsecase } from "../../entities/usecaseInterfaces/auth/register-usecase.interface";
import { HostSignupDTO, SignupDTO } from "../../shared/dtos/Auth.dto";
import { IBcrypt } from "../../entities/security/bcrypt.interface";
import { IUserRepositoryInterface } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IHostRepositoryInterface } from "entities/repositoryInterfaces/users/host-repository.interface";

@injectable()
export class RegisterUserusecase implements IRegisterUsecase {
  constructor(
    @inject("IPasswordBcrypt")
    private _passwordBcrypt: IBcrypt,

    @inject("IUserRepository")
    private _userRepository: IUserRepositoryInterface,

    @inject("IHostRepository")
    private _hostRepository: IHostRepositoryInterface,
  ) {}

  async execute(userData: SignupDTO | HostSignupDTO) {
    const hashedPassword = await this._passwordBcrypt.hash(userData.password);
    userData.password = hashedPassword;
    if (userData.role === "user") {
      return await this._userRepository.save(userData as SignupDTO);
    } else if (userData.role === "host") {
      return await this._hostRepository.save(userData as HostSignupDTO);
    } else {
      throw new Error("invalid role");
    }
  }
}
