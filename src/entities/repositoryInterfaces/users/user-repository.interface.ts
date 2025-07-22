import { IUserModel } from "../../../frameworks/database/mongo/models/user.model";
import { IBaseRepository } from "../IBaseRepository.interface";

export type IUserRepository = IBaseRepository<IUserModel>;
