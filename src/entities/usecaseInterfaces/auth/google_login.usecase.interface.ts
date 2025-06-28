import { IUserModel } from "../../../frameworks/database/mongo/models/user.model";
import { GoogleUserDTO } from "../../../shared/dtos/Auth.dto";

export interface IGoogleLoginUsecaseInterface {
  execute(user: GoogleUserDTO, role: string): Promise<IUserModel | undefined>;
}
