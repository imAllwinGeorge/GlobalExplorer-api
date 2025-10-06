import { ObjectId } from "mongoose";
import { inject, injectable } from "tsyringe";
import { IUserSearchUsecase } from "../../../entities/usecaseInterfaces/chat/direct-message/user-search.usecase.interface";
import { IUserRepository } from "../../../entities/repositoryInterfaces/users/user-repository.interface";
import { IHostRepository } from "../../../entities/repositoryInterfaces/users/host-repository.interface";

@injectable()
export class UserSearchUsecase implements IUserSearchUsecase {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepository,

    @inject("IHostRepository")
    private _hostRepository: IHostRepository,
  ) {}

  async execute(
    search: string,
  ): Promise<{ _Id: ObjectId; firstName: string; lastName: string }[]> {
    const filter = {
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastname: { $regex: search, $options: "i" } },
      ],
    };

    const projection = {
      firstName: 1,
      lastName: 1,
    };

    const users = await this._userRepository.findDetailsWithProjection(
      filter,
      projection,
    );

    return users as { _Id: ObjectId; firstName: string; lastName: string }[];
  }
}
