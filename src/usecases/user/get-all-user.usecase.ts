import { inject, injectable } from "tsyringe";
import { IGetAllUsersUsecase } from "../../entities/usecaseInterfaces/user/get-all-user.usecase.interface";
import { IUserRepository } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IHostRepository } from "../../entities/repositoryInterfaces/users/host-repository.interface";
import { UserMapper } from "../../shared/mappers/user.mapper";
import { HostMapper } from "../../shared/mappers/host.mapper";
import { HttpStatusCode, ROLE } from "../../shared/constants/constants";
import { IUserModel } from "../../frameworks/database/mongo/models/user.model";
import { IHostModel } from "../../frameworks/database/mongo/models/host.model";
import { AppError } from "../../shared/errors/appError";

@injectable()
export class GetAllUsersUsecase implements IGetAllUsersUsecase {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepository,

    @inject("IHostRepository")
    private _hostRepository: IHostRepository,

    @inject(UserMapper)
    private _userMapper: UserMapper,

    @inject(HostMapper)
    private _hostMapper: HostMapper,
  ) {}

  async execute(
    limit: number,
    skip: number,
    role: string,
  ): Promise<{ items: object[]; total: number }> {
    let result;

    if (role === ROLE.USER) {
      result = await this._userRepository.findAll(limit, skip, { role });

      const users = this._userMapper.toDTOs(result.items as IUserModel[]);

      return { items: users, total: result.total };
    } else if (role === ROLE.HOST) {
      result = await this._hostRepository.findAll(limit, skip, { role });

      const users = this._hostMapper.toDTOs(result.items as IHostModel[]);

      return { items: users, total: result.total };
    }

    if (!result) {
      throw new AppError(
        "failed to fetch users",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }

    return result;
  }
}
