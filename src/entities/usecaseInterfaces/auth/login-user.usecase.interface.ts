import { IHostModel } from "frameworks/database/mongo/models/host.model";
import { IAdminModel } from "../../../frameworks/database/mongo/models/admin.model";
import { IUserModel } from "../../../frameworks/database/mongo/models/user.model";
import { LoginUserDTO } from "../../../shared/dtos/Auth.dto";

export interface ILoginUser {
  execute(
    data: LoginUserDTO,
  ): Promise<IUserModel | IAdminModel | IHostModel | undefined>;
}
