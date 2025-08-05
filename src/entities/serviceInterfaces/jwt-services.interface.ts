import { JwtPayload } from "jsonwebtoken";

export interface IJwtservice {
  generateAccessToken(payload: object): string;
  generateRefreshToken(payload: object): string;
  resetToken(payload: object): string;
  verifyToken(token: string): { email: string; userId: string };
  verifyRefreshToken(token: string): JwtPayload;
}
