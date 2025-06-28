import { inject, injectable } from "tsyringe";
import { IUpdateStatusUsecaseInterface } from "../../entities/usecaseInterfaces/user/update-status.usecase.interface";
import { IUserModel } from "../../frameworks/database/mongo/models/user.model";
import { IUserRepositoryInterface } from "../../entities/repositoryInterfaces/users/user-repository.interface";

@injectable()
export class UpdateStatusUsecase implements IUpdateStatusUsecaseInterface {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepositoryInterface,
  ) {}

  async execute(_id: string, value: object): Promise<IUserModel> {
    const user = await this._userRepository.findOneAndUpdate({ _id }, value);
    if (!user) {
      throw new Error("user status update failed");
    }
    console.log("update status", user);
    return user;
  }
}
