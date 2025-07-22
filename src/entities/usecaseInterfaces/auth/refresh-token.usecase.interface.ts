import { JwtPayload } from "jsonwebtoken";

export interface IRefreshTokenUsecase {
  execute(refreshToken: string): Promise<JwtPayload>;
}
