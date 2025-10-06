import { inject, injectable } from "tsyringe";
import { IRevokeRefreshTokenUsecase } from "../../entities/usecaseInterfaces/auth/revok-refresh-token.usecase.interface";
import { IRefreshTokenRepository } from "../../entities/repositoryInterfaces/refreshToken/refresh-token.repository.interface";

@injectable()
export class RevokeRefreshTokenUsecase implements IRevokeRefreshTokenUsecase {
  constructor(
    @inject("IRefreshTokenRepository")
    private _refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute(refreshToken: string): Promise<void> {
    await this._refreshTokenRepository.delete({ refreshToken });
  }
}
