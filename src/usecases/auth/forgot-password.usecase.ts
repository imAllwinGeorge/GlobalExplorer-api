import { inject, injectable } from "tsyringe";
import { IForgotPasswordUsecase } from "../../entities/usecaseInterfaces/auth/forgot-password.usecase.interface";
import { IUserRepository } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IEmailSevices } from "../../entities/serviceInterfaces/email-services.interface";
import { IJwtservice } from "../../entities/serviceInterfaces/jwt-services.interface";
import dotenv from "dotenv";
import { IHostRepository } from "../../entities/repositoryInterfaces/users/host-repository.interface";
import { IAdminRepository } from "../../entities/repositoryInterfaces/users/admin-repository.inteface";
dotenv.config();

const frontEndUrl = process.env.FRONT_END_URL;

@injectable()
export class ForgotPasswordUsecase implements IForgotPasswordUsecase {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepository,

    @inject("IHostRepository")
    private _hostRepository: IHostRepository,

    @inject("IAdminRepository")
    private _adminRepository: IAdminRepository,

    @inject("IEmailServices")
    private _emailService: IEmailSevices,

    @inject("IJwtService")
    private _jwtService: IJwtservice,
  ) {}
  async execute(email: string, role: string): Promise<string> {
    let repository;
    if (role === "admin") {
      repository = this._adminRepository;
    } else if (role === "host") {
      repository = this._hostRepository;
    } else {
      repository = this._userRepository;
    }

    const user = await repository.findOne({ email });

    if (!user) throw new Error("User not found. Please enter a valid email.");

    const token = this._jwtService.resetToken({ email });

    const url = `${frontEndUrl}/reset-password/${role}/${user._id}/${token}`;

    await this._emailService.sendOtp(
      email,
      "Forgot password",
      `click the url to change the password: ${url}`,
    );

    return url;
  }
}
