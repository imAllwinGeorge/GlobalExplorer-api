import { inject, injectable } from "tsyringe";
import { IGetAllUsersUsecase } from "../../entities/usecaseInterfaces/user/get-all-user.usecase.interface";
import { IUserRepository } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IHostRepository } from "entities/repositoryInterfaces/users/host-repository.interface";

@injectable()
export class GetAllUsersUsecase implements IGetAllUsersUsecase {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepository,

    @inject("IHostRepository")
    private _hostRepository: IHostRepository,
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
