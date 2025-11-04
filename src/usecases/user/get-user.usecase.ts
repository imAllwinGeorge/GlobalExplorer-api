import { inject, injectable } from "tsyringe";
import { IGetUserUsecase } from "../../entities/usecaseInterfaces/user/get-user.usecase.interface";
import { IUserRepository } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IHostRepository } from "../../entities/repositoryInterfaces/users/host-repository.interface";
import {
  HostResponseDTO,
  UserResponseDTO,
} from "../../shared/dtos/response.dto";
import { HttpStatusCode, ROLE } from "../../shared/constants/constants";
import { AppError } from "../../shared/errors/appError";
import { IUserMapper } from "../../entities/mapperInterfaces/user-mapper.interface";
import { IHostMapper } from "../../entities/mapperInterfaces/host-mapper.interface";

@injectable()
export class GetUserUsecase implements IGetUserUsecase {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepository,

    @inject("IHostRepository")
    private _hostRepository: IHostRepository,

    @inject("IUserMapper")
    private _userMapper: IUserMapper,

    @inject("IHostMapper")
    private _hostMapper: IHostMapper,
  ) {}
  async execute(
    _id: string,
    role: string,
  ): Promise<HostResponseDTO | UserResponseDTO> {
    let user;

    if (role === ROLE.USER) {
      user = await this._userRepository.findById({ _id });

      if (!user)
        throw new AppError(" User not found!", HttpStatusCode.NOT_FOUND);

      return this._userMapper.toDTO(user);
    } else if (role === ROLE.HOST) {
      user = await this._hostRepository.findById({ _id });

      if (!user)
        throw new AppError("Host not found!", HttpStatusCode.NOT_FOUND);

      return this._hostMapper.toDTO(user);
    }

    throw new AppError("Invalid request", HttpStatusCode.NOT_FOUND);
  }
}
