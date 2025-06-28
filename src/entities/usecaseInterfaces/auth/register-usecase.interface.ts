import { IHostModel } from "frameworks/database/mongo/models/host.model";
import { IUserModel } from "../../../frameworks/database/mongo/models/user.model";
import { HostSignupDTO, SignupDTO } from "../../../shared/dtos/Auth.dto";

export interface IRegisterUsecase {
  execute(
    userData: SignupDTO | HostSignupDTO,
  ): Promise<IUserModel | IHostModel>;
}
