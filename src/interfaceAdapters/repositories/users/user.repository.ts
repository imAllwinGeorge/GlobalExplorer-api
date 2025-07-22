import { injectable } from "tsyringe";
import { IUserRepository } from "../../../entities/repositoryInterfaces/users/user-repository.interface";
import {
  IUserModel,
  UserModel,
} from "../../../frameworks/database/mongo/models/user.model";
import { BaseRepository } from "../base.repository";

@injectable()
export class UserRepository
  extends BaseRepository<IUserModel>
  implements IUserRepository
{
  constructor() {
    super(UserModel);
  }
}
