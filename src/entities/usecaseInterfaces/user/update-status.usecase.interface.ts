import { IHostModel } from "frameworks/database/mongo/models/host.model";
import { IUserModel } from "../../../frameworks/database/mongo/models/user.model";

export interface IUpdateStatusUsecase {
  execute(
    id: string,
    value: object,
    role: string,
  ): Promise<IUserModel | IHostModel>;
}
