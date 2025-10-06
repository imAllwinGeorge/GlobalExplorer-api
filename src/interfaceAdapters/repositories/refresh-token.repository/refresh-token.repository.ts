import { IRefreshTokenRepository } from "../../../entities/repositoryInterfaces/refreshToken/refresh-token.repository.interface";
import {
  IRefreshTokenModel,
  RefreshTokenModel,
} from "../../../frameworks/database/mongo/models/refresh-token.model";
import { BaseRepository } from "../base.repository";
import { injectable } from "tsyringe";

@injectable()
export class RefreshTokenRepository
  extends BaseRepository<IRefreshTokenModel>
  implements IRefreshTokenRepository
{
  constructor() {
    super(RefreshTokenModel);
  }
}
