import { JwtPayload } from "jsonwebtoken";

export interface IRefreshTokenUsecaseInterface {
  execute(refreshToken: string): Promise<JwtPayload>;
}
