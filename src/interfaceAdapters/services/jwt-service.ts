import { injectable } from "tsyringe";
import { IJwtserviceInterface } from "../../entities/serviceInterfaces/jwt-services.interface";
import jwt from "jsonwebtoken";

@injectable()
export class JwtService implements IJwtserviceInterface {
  constructor() {}
  generateAccessToken(payload: object): string {
    console.log("access token", process.env.ACCESS_TOKEN);
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "1h",
    });
    return accessToken;
  }

  resetToken(payload: object): string {
    const token = jwt.sign(payload, process.env.RESET_TOKEN_SECRET!, {
      expiresIn: "1h",
    });
    return token;
  }

  verifyToken(token: string): { email: string } {
    const payload = jwt.verify(token, process.env.RESET_TOKEN_SECRET!);
    console.log("jsonwebtoken verify token:  ", payload);
    return payload as { email: string };
  }
}
