import { Schema } from "mongoose";
import { IGenerateToken } from "../../entities/usecaseInterfaces/auth/generate_token-usecase.interface";
import { IJwtservice } from "../../entities/serviceInterfaces/jwt-services.interface";
import { inject, injectable } from "tsyringe";
import { IRefreshTokenRepository } from "entities/repositoryInterfaces/refreshToken/refresh-token.repository.interface";

@injectable()
export class GenerateToken implements IGenerateToken {
  constructor(
    @inject("IJwtService")
    private _tokenService: IJwtservice,

    @inject("IRefreshTokenRepository")
    private _refreshTokenRepository: IRefreshTokenRepository,
  ) {}
  async execute(
    userId: Schema.Types.ObjectId,
    email: string,
    role: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = {
      userId,
      email,
      role,
    };
    const accessToken = this._tokenService.generateAccessToken(payload);
    const refreshToken = this._tokenService.generateRefreshToken(payload);

    await this._refreshTokenRepository.save({
      userId: userId.toString(),
      refreshToken,
      userType: role,
      expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return { accessToken, refreshToken };
  }
}
