import { JwtPayload } from "jsonwebtoken";

export interface IJwtserviceInterface {
  generateAccessToken(payload: object): string;
  generateRefreshToken(payload: object): string;
  resetToken(payload: object): string;
  verifyToken(token: string): { email: string };
  verifyRefreshToken(token: string): JwtPayload;
}
