import { IAdminModel } from "frameworks/database/mongo/models/admin.model";
import { IHostModel } from "frameworks/database/mongo/models/host.model";
import { IUserModel } from "frameworks/database/mongo/models/user.model";

export interface IGetProfileUsecase {
  execute(
    id: string,
    role: string,
  ): Promise<IUserModel | IHostModel | IAdminModel>;
}
