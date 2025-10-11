import { ISendOtpUsecase } from "../../entities/usecaseInterfaces/auth/send-otp.usecase.interface";
import { inject, injectable } from "tsyringe";
import { IUserExistanceService } from "../../entities/serviceInterfaces/user-existance-service.interface";
import { IOtpService } from "../../entities/serviceInterfaces/otp-service.interface";
import { IEmailSevices } from "../../entities/serviceInterfaces/email-services.interface";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";

@injectable()
export class SendOtpUsecase implements ISendOtpUsecase {
  constructor(
    @inject("IUserExistanceService")
    private _userExistanceService: IUserExistanceService,

    @inject("IOtpService")
    private _otpService: IOtpService,

    @inject("IEmailServices")
    private _emailServices: IEmailSevices,
  ) {}
  async execute(email: string, role: string): Promise<string> {
    const isEmailExisting = await this._userExistanceService.emailExists(
      email,
      role,
    );

    if (isEmailExisting)
      throw new AppError("Email already exist", HttpStatusCode.CONFLICT);

    const otp = this._otpService.generateOtp();

    this._emailServices.sendOtp(
      email,
      "Verify your email",
      `email verification otp: ${otp}`,
    );

    return otp;
  }
}
