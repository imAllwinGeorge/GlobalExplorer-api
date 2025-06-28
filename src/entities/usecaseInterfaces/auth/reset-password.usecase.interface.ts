import { IHostModel } from "frameworks/database/mongo/models/host.model";
import { IUserModel } from "../../../frameworks/database/mongo/models/user.model";
import { IAdminModel } from "frameworks/database/mongo/models/admin.model";

export interface IResetPasswordUseCaseInterface {
  execute(
    id: string,
    role: string,
    token: string,
    password: string,
  ): Promise<IUserModel | IHostModel | IAdminModel | null>;
}
