import { IUserModel } from "../../../frameworks/database/mongo/models/user.model";
import { IBaseRepositoryInterface } from "../IBaseRepository.interface";

export type IUserRepositoryInterface = IBaseRepositoryInterface<IUserModel>;
