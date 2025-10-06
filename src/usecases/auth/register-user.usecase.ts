import { inject, injectable } from "tsyringe";
import { IRegisterUsecase } from "../../entities/usecaseInterfaces/auth/register-usecase.interface";
import { HostSignupDTO, SignupDTO } from "../../shared/dtos/Auth.dto";
import { IBcrypt } from "../../entities/security/bcrypt.interface";
import { IUserRepository } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IHostRepository } from "../../entities/repositoryInterfaces/users/host-repository.interface";
import { HostMapper } from "../../shared/mappers/host.mapper";
import { ROLE } from "../../shared/constants/constants";

@injectable()
export class RegisterUserusecase implements IRegisterUsecase {
  constructor(
    @inject("IPasswordBcrypt")
    private _passwordBcrypt: IBcrypt,

    @inject("IUserRepository")
    private _userRepository: IUserRepository,

    @inject("IHostRepository")
    private _hostRepository: IHostRepository,

    @inject(HostMapper)
    private _hostMapper: HostMapper,
  ) {}

  async execute(userData: SignupDTO | HostSignupDTO) {
    const hashedPassword = await this._passwordBcrypt.hash(userData.password);

    userData.password = hashedPassword;

    if (userData.role === ROLE.USER) {
      return await this._userRepository.save(userData as SignupDTO);
    } else if (userData.role === ROLE.HOST) {
      const mappedHostData = this._hostMapper.toEntity(
        userData as HostSignupDTO,
      );

      return await this._hostRepository.save(mappedHostData as HostSignupDTO);
    } else {
      throw new Error("invalid role");
    }
  }
}
