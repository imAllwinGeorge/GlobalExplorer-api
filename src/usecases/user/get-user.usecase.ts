import { IHostRepositoryInterface } from "entities/repositoryInterfaces/users/host-repository.interface";
import { IUserRepositoryInterface } from "entities/repositoryInterfaces/users/user-repository.interface";
import { IGetUserUsecaseInterface } from "entities/usecaseInterfaces/user/get-user.usecase.interface";
import { IHostModel } from "frameworks/database/mongo/models/host.model";
import { IUserModel } from "frameworks/database/mongo/models/user.model";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetUserUsecase implements IGetUserUsecaseInterface {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepositoryInterface,

    @inject("IHostRepository")
    private _hostRepository: IHostRepositoryInterface,
  ) {}
  async execute(_id: string, role: string): Promise<IHostModel | IUserModel> {
    let repository;
    if (role === "user") {
      repository = this._userRepository;
    } else if (role === "host") {
      repository = this._hostRepository;
    } else {
      throw new Error("Invalid request");
    }

    const user = await repository.findById({ _id });
    if (!user) throw new Error("user not found");
    return user;
  }
}
