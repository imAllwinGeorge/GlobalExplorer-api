import { IBaseEntitiy } from "./base.entity";

export interface IUserEntity extends IBaseEntitiy {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  role: "user" | "admin" | "host";
  isBlocked: boolean;
}
