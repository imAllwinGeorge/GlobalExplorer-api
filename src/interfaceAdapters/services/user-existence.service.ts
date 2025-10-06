import { inject, injectable } from "tsyringe";
import { IUserExistanceService } from "../../entities/serviceInterfaces/user-existance-service.interface";
import { IUserRepository } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IHostRepository } from "../../entities/repositoryInterfaces/users/host-repository.interface";
import { IUserModel } from "../../frameworks/database/mongo/models/user.model";
import { IHostModel } from "../../frameworks/database/mongo/models/host.model";

@injectable()
export class UserExistanceService implements IUserExistanceService {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepository,

    @inject("IHostRepository")
    private _hostRepository: IHostRepository,
  ) {}

  async emailExists(
    email: string,
    role: string,
  ): Promise<IUserModel | IHostModel | null> {
    let repository;
    if (role === "user") {
      repository = this._userRepository;
    } else if (role === "host") {
      repository = this._hostRepository;
    } else {
      throw new Error("invalid Role");
    }
    const user = await repository.findOne({ email });
    console.log(user);
    return user;
  }
}
