import { IRefreshTokenRepository } from "entities/repositoryInterfaces/refreshToken/refresh-token.repository.interface";
import { IRevokeRefreshTokenUsecase } from "entities/usecaseInterfaces/auth/revok-refresh-token.usecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class RevokeRefreshTokenUsecase implements IRevokeRefreshTokenUsecase {
  constructor(
    @inject("IRefreshTokenRepository")
    private _refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute(refreshToken: string): Promise<void> {
    await this._refreshTokenRepository.delete({ refreshToken });
    console.log(
      "token                            :",
      await this._refreshTokenRepository.findOne({ refreshToken }),
    );
  }
}
