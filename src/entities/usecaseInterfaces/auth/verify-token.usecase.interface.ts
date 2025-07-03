import { IAdminModel } from "frameworks/database/mongo/models/admin.model";
import { IHostModel } from "frameworks/database/mongo/models/host.model";
import { IUserModel } from "frameworks/database/mongo/models/user.model";

export interface IVerifyTokenUsecaseInterface {
  execute(
    token: string,
    tole: string,
  ): Promise<IAdminModel | IHostModel | IUserModel>;
}
