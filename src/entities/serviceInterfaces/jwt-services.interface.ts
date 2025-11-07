import { JwtPayload } from "jsonwebtoken";

export interface IJwtservice {
  generateAccessToken(payload: object): string;
  generateRefreshToken(payload: object): string;
  resetToken(payload: object): string;
  verifyToken(token: string): { email: string; userId: string };
  verifyRefreshToken(token: string): JwtPayload;
  qrTokenGenerator(payload: object, expiry: Date): string;
  veriyQRToken(token: string): JwtPayload;
}
