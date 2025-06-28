export interface IJwtserviceInterface {
  generateAccessToken(payload: object): string;
  resetToken(payload: object): string;
  verifyToken(token: string): { email: string };
}
