import { inject, injectable } from "tsyringe";
import { IUpdateStatusUsecaseInterface } from "../../entities/usecaseInterfaces/user/update-status.usecase.interface";
import { IUserModel } from "../../frameworks/database/mongo/models/user.model";
import { IUserRepositoryInterface } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IHostRepositoryInterface } from "entities/repositoryInterfaces/users/host-repository.interface";
import { IHostModel } from "frameworks/database/mongo/models/host.model";

@injectable()
export class UpdateStatusUsecase implements IUpdateStatusUsecaseInterface {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepositoryInterface,

    @inject("IHostRepository")
    private _hostRepository: IHostRepositoryInterface,
  ) {}

  async execute(
    _id: string,
    value: object,
    role: string,
  ): Promise<IUserModel | IHostModel> {
    console.log("value for updating  ", value);
    let repository;
    if (role === "user") {
      repository = this._userRepository;
    } else if (role === "host") {
      repository = this._hostRepository;
    } else {
      throw new Error("invalid request");
    }
    const user = await repository.findOneAndUpdate({ _id }, value);
    if (!user) {
      throw new Error("user status update failed");
    }
    console.log("update status", user);
    return user;
  }
}
