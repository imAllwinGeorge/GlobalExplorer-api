import { JwtPayload } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IRefreshTokenUsecase } from "../../entities/usecaseInterfaces/auth/refresh-token.usecase.interface";
import { IRefreshTokenRepository } from "../../entities/repositoryInterfaces/refreshToken/refresh-token.repository.interface";
import { IJwtservice } from "../../entities/serviceInterfaces/jwt-services.interface";

@injectable()
export class RefreshTokenUsecase implements IRefreshTokenUsecase {
  constructor(
    @inject("IRefreshTokenRepository")
    private _refreshTokenRepository: IRefreshTokenRepository,

    @inject("IJwtService")
    private _jwtService: IJwtservice,
  ) {}

  async execute(refreshToken: string): Promise<JwtPayload> {
    const storedToken = await this._refreshTokenRepository.findOne({
      refreshToken,
    });

    if (!storedToken) throw new Error("Invalid Token");

    const payload = this._jwtService.verifyRefreshToken(refreshToken);
    if (!payload) throw new Error("Invalid Token");

    await this._refreshTokenRepository.delete({ refreshToken });

    return payload;
  }
}
