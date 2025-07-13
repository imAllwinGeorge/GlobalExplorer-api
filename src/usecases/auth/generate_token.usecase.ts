import { Schema } from "mongoose";
import { IGenerateTokenInterface } from "../../entities/usecaseInterfaces/auth/generate_token-usecase.interface";
import { IJwtserviceInterface } from "../../entities/serviceInterfaces/jwt-services.interface";
import { inject, injectable } from "tsyringe";
import { IRefreshTokenRepositoryInterface } from "entities/repositoryInterfaces/refreshToken/refresh-token.repository.interface";

@injectable()
export class GenerateToken implements IGenerateTokenInterface {
  constructor(
    @inject("IJwtService")
    private _tokenService: IJwtserviceInterface,

    @inject("IRefreshTokenRepository")
    private _refreshTokenRepository: IRefreshTokenRepositoryInterface,
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
