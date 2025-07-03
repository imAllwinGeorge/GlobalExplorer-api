import { IHostModel } from "frameworks/database/mongo/models/host.model";
import { IUserModel } from "../../../frameworks/database/mongo/models/user.model";

export interface IGetAllUsersUsecaseInterface {
  execute(role: string): Promise<IUserModel[] | IHostModel[]>;
}
