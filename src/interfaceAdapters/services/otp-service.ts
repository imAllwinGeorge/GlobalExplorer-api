import { IOtpService } from "../../entities/serviceInterfaces/otp-service.interface";

export class OtpService implements IOtpService {
  constructor() {}

  generateOtp(): string {
    return Math.floor(Math.random() * 900000 + 100000).toString();
  }
}
