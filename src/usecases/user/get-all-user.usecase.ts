import { inject, injectable } from "tsyringe";
import { IGetAllUsersUsecaseInterface } from "../../entities/usecaseInterfaces/user/get-all-user.usecase.interface";
import { IUserRepositoryInterface } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IUserModel } from "../../frameworks/database/mongo/models/user.model";

@injectable()
export class GetAllUsersUsecase implements IGetAllUsersUsecaseInterface {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepositoryInterface,
  ) {}

  async execute(role: string): Promise<IUserModel[]> {
    let repository;
    if (role === "user") {
      repository = this._userRepository;
    }
    const users = await repository?.find({ role });
    if (!users) {
      throw new Error("failed to fetch users");
    }
    return users;
  }
}
