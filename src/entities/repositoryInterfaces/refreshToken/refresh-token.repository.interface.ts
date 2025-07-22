import { IRefreshTokenModel } from "frameworks/database/mongo/models/refresh-token.model";
import { IBaseRepository } from "../IBaseRepository.interface";

export type IRefreshTokenRepository = IBaseRepository<IRefreshTokenModel>;

// export interface IRefreshTokenRepositoryInterface
//   extends IBaseRepositoryInterface<IRefreshTokenModel> {}
