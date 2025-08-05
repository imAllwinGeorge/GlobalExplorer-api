import { injectable } from "tsyringe";
import { IJwtservice } from "../../entities/serviceInterfaces/jwt-services.interface";
import jwt, { JwtPayload } from "jsonwebtoken";

@injectable()
export class JwtService implements IJwtservice {
  constructor() {}
  generateAccessToken(payload: object): string {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "1h",
    });
    return accessToken;
  }

  generateRefreshToken(payload: object): string {
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: "7d",
    });
    return refreshToken;
  }

  resetToken(payload: object): string {
    const token = jwt.sign(payload, process.env.RESET_TOKEN_SECRET!, {
      expiresIn: "1h",
    });
    return token;
  }

  verifyToken(token: string): { email: string; userId: string } {
    const payload = jwt.verify(token, process.env.RESET_TOKEN_SECRET!);
    if (!payload) throw new Error("session Expired!");
    console.log("jsonwebtoken verify token:  ", payload);
    return payload as { email: string; userId: string };
  }

  verifyRefreshToken(token: string): JwtPayload {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);

    if (!payload) throw new Error("Sesstion Expired");
    return payload as JwtPayload;
  }
}
