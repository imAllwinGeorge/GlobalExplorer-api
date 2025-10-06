import { IBaseEntitiy } from "./base.entity";

export interface IRefreshTokenEntity extends IBaseEntitiy {
  userId: string;
  userType: string;
  refreshToken: string;
  expiredAt: Date;
}
