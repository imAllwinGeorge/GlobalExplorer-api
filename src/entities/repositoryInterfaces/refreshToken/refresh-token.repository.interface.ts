import { IRefreshTokenModel } from "frameworks/database/mongo/models/refresh-token.model";
import { IBaseRepositoryInterface } from "../IBaseRepository.interface";

export type IRefreshTokenRepositoryInterface =
  IBaseRepositoryInterface<IRefreshTokenModel>;

// export interface IRefreshTokenRepositoryInterface
//   extends IBaseRepositoryInterface<IRefreshTokenModel> {}
