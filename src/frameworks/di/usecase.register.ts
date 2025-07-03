import { container } from "tsyringe";
import { RegisterUserusecase } from "../../usecases/auth/register-user.usecase";
import { IRegisterUsecase } from "../../entities/usecaseInterfaces/auth/register-usecase.interface";
import { IUserExistanceService } from "../../entities/serviceInterfaces/user-existance-service.interface";
import { UserExistanceService } from "../../interfaceAdapters/services/user-existence.service";
import { ISendOtpUsecaseInterface } from "../../entities/usecaseInterfaces/auth/send-otp.usecase.interface";
import { SendOtpUsecase } from "../../usecases/auth/send-otp.usecase";
import { IBcrypt } from "../../entities/security/bcrypt.interface";
import { PasswordBcrypt } from "../security/password-bcrypt";
import { IOtpService } from "../../entities/serviceInterfaces/otp-service.interface";
import { OtpService } from "../../interfaceAdapters/services/otp-service";
import { IEmailSevicesInterface } from "../../entities/serviceInterfaces/email-services.interface";
import { EmailServices } from "../../interfaceAdapters/services/email-services";
import { IJwtserviceInterface } from "../../entities/serviceInterfaces/jwt-services.interface";
import { JwtService } from "../../interfaceAdapters/services/jwt-service";
import { IGenerateTokenInterface } from "../../entities/usecaseInterfaces/auth/generate_token-usecase.interface";
import { GenerateToken } from "../../usecases/auth/generate_token.usecase";
import { ILoginUserInterface } from "../../entities/usecaseInterfaces/auth/login-user.usecase.interface";
import { LoginUsecase } from "../../usecases/auth/login-user.usecase";
import { IForgotPasswordUsecaseInterface } from "../../entities/usecaseInterfaces/auth/forgot-password.usecase.interface";
import { ForgotPasswordUsecase } from "../../usecases/auth/forgot-password.usecase";
import { ResetPasswordUsecase } from "../../usecases/auth/reset-password.usecase";
import { IResetPasswordUseCaseInterface } from "../../entities/usecaseInterfaces/auth/reset-password.usecase.interface";
import { IVerifyTokenUsecaseInterface } from "../../entities/usecaseInterfaces/auth/verify-token.usecase.interface";
import { VerifyTokenUsecase } from "../../usecases/auth/verfiy-token.usecase";
import { IGoogleLoginUsecaseInterface } from "../../entities/usecaseInterfaces/auth/google_login.usecase.interface";
import { GoogleLoginUsecase } from "../../usecases/auth/google_login.usecase";
import { IGetAllUsersUsecaseInterface } from "../../entities/usecaseInterfaces/user/get-all-user.usecase.interface";
import { GetAllUsersUsecase } from "../../usecases/user/get-all-user.usecase";
import { IUpdateStatusUsecaseInterface } from "../../entities/usecaseInterfaces/user/update-status.usecase.interface";
import { UpdateStatusUsecase } from "../../usecases/user/update-status.usecase";
import { IGetUserUsecaseInterface } from "entities/usecaseInterfaces/user/get-user.usecase.interface";
import { GetUserUsecase } from "usecases/user/get-user.usecase";

export class UsecaseRegistery {
  static registerUsecases(): void {
    container.register<IRegisterUsecase>("IRegisterUseCase", {
      useClass: RegisterUserusecase,
    });

    container.register<ILoginUserInterface>("ILoginUserUsecase", {
      useClass: LoginUsecase,
    });

    container.register<IUserExistanceService>("IUserExistanceService", {
      useClass: UserExistanceService,
    });
    container.register<ISendOtpUsecaseInterface>("ISendOtpUsecase", {
      useClass: SendOtpUsecase,
    });

    container.register<IForgotPasswordUsecaseInterface>(
      "IForgotPasswordUsecase",
      {
        useClass: ForgotPasswordUsecase,
      },
    );

    container.register<IResetPasswordUseCaseInterface>(
      "IResetPasswordUsecase",
      {
        useClass: ResetPasswordUsecase,
      },
    );

    container.register<IVerifyTokenUsecaseInterface>("IVerifyTokenUsecase", {
      useClass: VerifyTokenUsecase,
    });

    container.register<IBcrypt>("IPasswordBcrypt", {
      useClass: PasswordBcrypt,
    });

    container.register<IOtpService>("IOtpService", {
      useClass: OtpService,
    });

    container.register<IGenerateTokenInterface>("IGeneratorUsecase", {
      useClass: GenerateToken,
    });

    container.register<IEmailSevicesInterface>("IEmailServices", {
      useClass: EmailServices,
    });

    container.register<IJwtserviceInterface>("IJwtService", {
      useClass: JwtService,
    });

    container.register<IGoogleLoginUsecaseInterface>("IGoogleLoginUsecase", {
      useClass: GoogleLoginUsecase,
    });

    container.register<IGetAllUsersUsecaseInterface>("IGetAllUsersUsecase", {
      useClass: GetAllUsersUsecase,
    });

    container.register<IUpdateStatusUsecaseInterface>("IUpdateStatusUsecase", {
      useClass: UpdateStatusUsecase,
    });

    container.register<IGetUserUsecaseInterface>("IGetUserUsecase", {
      useClass: GetUserUsecase,
    });
  }
}
