import { inject, injectable } from "tsyringe";
import { IGetAllUsersUsecaseInterface } from "../../entities/usecaseInterfaces/user/get-all-user.usecase.interface";
import { IUserRepositoryInterface } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IUserModel } from "../../frameworks/database/mongo/models/user.model";
import { IHostRepositoryInterface } from "entities/repositoryInterfaces/users/host-repository.interface";
import { IHostModel } from "frameworks/database/mongo/models/host.model";

@injectable()
export class GetAllUsersUsecase implements IGetAllUsersUsecaseInterface {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepositoryInterface,

    @inject("IHostRepository")
    private _hostRepository: IHostRepositoryInterface,
  ) {}

  async execute(role: string): Promise<IUserModel[] | IHostModel[]> {
    let repository;
    if (role === "user") {
      repository = this._userRepository;
    } else if (role === "host") {
      repository = this._hostRepository;
    }
    const users = await repository?.find({ role });
    if (!users) {
      throw new Error("failed to fetch users");
    }
    return users;
  }
}
