import { IHostModel } from "frameworks/database/mongo/models/host.model";
import { IUserModel } from "frameworks/database/mongo/models/user.model";

export interface IGetUserUsecase {
  execute(_id: string, role: string): Promise<IHostModel | IUserModel>;
}
