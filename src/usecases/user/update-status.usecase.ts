import { inject, injectable } from "tsyringe";
import { IUpdateStatusUsecase } from "../../entities/usecaseInterfaces/user/update-status.usecase.interface";
import { IUserRepository } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IHostRepository } from "../../entities/repositoryInterfaces/users/host-repository.interface";
import { ISocketUserMapRepository } from "../../entities/repositoryInterfaces/redis/socket-user.repository";
import { ISocketServices } from "../../entities/serviceInterfaces/socket.service";
import {
  HostResponseDTO,
  UserResponseDTO,
} from "../../shared/dtos/response.dto";
import { HttpStatusCode, ROLE } from "../../shared/constants/constants";
import { IUserModel } from "../../frameworks/database/mongo/models/user.model";
import { IHostModel } from "../../frameworks/database/mongo/models/host.model";
import { AppError } from "../../shared/errors/appError";
import { IUserMapper } from "../../entities/mapperInterfaces/user-mapper.interface";
import { IHostMapper } from "../../entities/mapperInterfaces/host-mapper.interface";
import { IJwtservice } from "../../entities/serviceInterfaces/jwt-services.interface";

@injectable()
export class UpdateStatusUsecase implements IUpdateStatusUsecase {
  constructor(
    @inject("IJwtService")
    private _jwtServices: IJwtservice,

    @inject("IUserRepository")
    private _userRepository: IUserRepository,

    @inject("IHostRepository")
    private _hostRepository: IHostRepository,

    @inject("ISocketUserRepository")
    private _socketRepository: ISocketUserMapRepository,

    @inject("ISocketServices")
    private _socketServices: ISocketServices,

    @inject("IUserMapper")
    private _userMapper: IUserMapper,

    @inject("IHostMapper")
    private _hostMapper: IHostMapper,
  ) {}

  async execute(
    _id: string,
    value: object,
    role: string,
    token?: string,
  ): Promise<UserResponseDTO | HostResponseDTO> {
    if (token) {
      const payload = this._jwtServices.verifyToken(token);

      if (payload.userId !== _id) {
        throw new AppError("Unauthorized", HttpStatusCode.UNAUTHORIZED);
      }
    }
    let repository;

    if (role === ROLE.USER) {
      repository = this._userRepository;
    } else if (role === ROLE.HOST) {
      repository = this._hostRepository;
    }
    console.log("before operation:   ", value);
    const user = await repository?.findOneAndUpdate({ _id }, value);

    if (!user)
      throw new AppError("Invalid request!", HttpStatusCode.BAD_REQUEST);

    if (user.isBlocked === true) {
      console.log(" after cheking the user is blocked or not:  ", user);

      const socketId = await this._socketRepository.getUserSocket(
        user._id as unknown as string,
      );
      if (socketId) {
        const io = this._socketServices.getIO();
        const socket = io.sockets.sockets.get(socketId);

        if (socket) {
          console.log("socket dissconnect triggered......");
          socket.disconnect(true);
        } else {
          console.log("socket not found for user: ", user._id);
        }
      }
      await this._socketRepository.removeUserSocket(
        user._id as unknown as string,
      );
    }

    if (user.role === ROLE.USER) {
      return this._userMapper.toDTO(user as IUserModel);
    } else {
      return this._hostMapper.toDTO(user as IHostModel);
    }
  }
}
