import { IRefreshTokenRepositoryInterface } from "entities/repositoryInterfaces/refreshToken/refresh-token.repository.interface";
import { IJwtserviceInterface } from "entities/serviceInterfaces/jwt-services.interface";
import { IRefreshTokenUsecaseInterface } from "entities/usecaseInterfaces/auth/refresh-token.usecase.interface";
import { JwtPayload } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

@injectable()
export class RefreshTokenUsecase implements IRefreshTokenUsecaseInterface {
  constructor(
    @inject("IRefreshTokenRepository")
    private _refreshTokenRepository: IRefreshTokenRepositoryInterface,

    @inject("IJwtService")
    private _jwtService: IJwtserviceInterface,
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
