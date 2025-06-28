import { inject, injectable } from "tsyringe";
import { IForgotPasswordUsecaseInterface } from "../../entities/usecaseInterfaces/auth/forgot-password.usecase.interface";
import { IUserRepositoryInterface } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IEmailSevicesInterface } from "../../entities/serviceInterfaces/email-services.interface";
import { IJwtserviceInterface } from "../../entities/serviceInterfaces/jwt-services.interface";
import { IHostRepositoryInterface } from "entities/repositoryInterfaces/users/host-repository.interface";
import { IAdminRepositoryInterface } from "entities/repositoryInterfaces/users/admin-repository.inteface";

@injectable()
export class ForgotPasswordUsecase implements IForgotPasswordUsecaseInterface {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepositoryInterface,

    @inject("IHostRepository")
    private _hostRepository: IHostRepositoryInterface,

    @inject("IAdminRepository")
    private _adminRepository: IAdminRepositoryInterface,

    @inject("IEmailServices")
    private _emailService: IEmailSevicesInterface,

    @inject("IJwtService")
    private _jwtService: IJwtserviceInterface,
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
    const url = `http://localhost:5173/reset-password/${role}/${user._id}/${token}`;
    await this._emailService.sendOtp(
      email,
      "Forgot password",
      `click the url to change the password: ${url}`,
    );
    return url;
  }
}
