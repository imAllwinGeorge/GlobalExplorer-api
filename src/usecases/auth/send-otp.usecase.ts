import { ISendOtpUsecaseInterface } from "../../entities/usecaseInterfaces/auth/send-otp.usecase.interface";
import { inject, injectable } from "tsyringe";
import { IUserExistanceService } from "../../entities/serviceInterfaces/user-existance-service.interface";
import { IOtpService } from "../../entities/serviceInterfaces/otp-service.interface";
import { IEmailSevicesInterface } from "../../entities/serviceInterfaces/email-services.interface";

@injectable()
export class SendOtpUsecase implements ISendOtpUsecaseInterface {
  constructor(
    @inject("IUserExistanceService")
    private _userExistanceService: IUserExistanceService,

    @inject("IOtpService")
    private _otpService: IOtpService,

    @inject("IEmailServices")
    private _emailServices: IEmailSevicesInterface,
  ) {}
  async execute(email: string, role: string): Promise<string> {
    const isEmailExisting = await this._userExistanceService.emailExists(
      email,
      role,
    );
    console.log(isEmailExisting);
    if (isEmailExisting) throw new Error("Email already exist");

    const otp = this._otpService.generateOtp();
    this._emailServices.sendOtp(
      email,
      "Verify your email",
      `email verification otp: ${otp}`,
    );
    return otp;
  }
}
