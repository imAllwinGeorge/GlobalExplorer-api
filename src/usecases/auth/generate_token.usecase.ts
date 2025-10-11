import { Schema } from "mongoose";
import { IGenerateToken } from "../../entities/usecaseInterfaces/auth/generate_token-usecase.interface";
import { IJwtservice } from "../../entities/serviceInterfaces/jwt-services.interface";
import { inject, injectable } from "tsyringe";
import { IRefreshTokenRepository } from "../../entities/repositoryInterfaces/refreshToken/refresh-token.repository.interface";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";
import logger from "../../infrastructures/logger";

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
    try {
      const payload = {
        userId,
        email,
        role,
      };
      // const accessToken = this._tokenService.generateAccessToken(payload);
      // const refreshToken = this._tokenService.generateRefreshToken(payload);

      const accessTokenPromise = Promise.resolve(
        this._tokenService.generateAccessToken(payload),
      );
      const refreshTokenPromise = Promise.resolve(
        this._tokenService.generateRefreshToken(payload),
      );

      const [accessToken, refreshToken] = await Promise.all([
        accessTokenPromise,
        refreshTokenPromise,
      ]);

      await this._refreshTokenRepository.save({
        userId: userId.toString(),
        refreshToken,
        userType: role,
        expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      return { accessToken, refreshToken };
    } catch (error) {
      logger.error(error);
      throw new AppError(
        "Failed to create token",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
