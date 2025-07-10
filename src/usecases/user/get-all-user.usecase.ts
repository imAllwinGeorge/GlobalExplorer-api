import { inject, injectable } from "tsyringe";
import { IGetAllUsersUsecaseInterface } from "../../entities/usecaseInterfaces/user/get-all-user.usecase.interface";
import { IUserRepositoryInterface } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IHostRepositoryInterface } from "entities/repositoryInterfaces/users/host-repository.interface";

@injectable()
export class GetAllUsersUsecase implements IGetAllUsersUsecaseInterface {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepositoryInterface,

    @inject("IHostRepository")
    private _hostRepository: IHostRepositoryInterface,
  ) {}

  async execute(
    limit: number,
    skip: number,
    role: string,
  ): Promise<{ items: object[]; total: number }> {
    let repository;
    if (role === "user") {
      repository = this._userRepository;
    } else if (role === "host") {
      repository = this._hostRepository;
    }
    const result = await repository?.findAll(limit, skip, { role });
    if (!result) {
      throw new Error("failed to fetch users");
    }
    return result;
  }
}
