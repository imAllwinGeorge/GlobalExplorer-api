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
import { IGetAllCategoryUsecaseInterface } from "entities/usecaseInterfaces/category/get-all-category.usecase.interface";
import { GetAllCategoryUsecase } from "usecases/category/get-all-category.usecase";
import { IAddCategoryUsecaseInterface } from "entities/usecaseInterfaces/category/add-category.usecase.interface";
import { AddCategoryUseCase } from "usecases/category/add-category.usecase";
import { IEditCategoryUsecaseInterface } from "entities/usecaseInterfaces/category/edit-category.usecase.interface";
import { EditCategoryUsecase } from "usecases/category/edit-category.usecase";
import { IUpdateCategoryUsecaseInterface } from "entities/usecaseInterfaces/category/update-category.usecase.interface";
import { UpdateStatusCategoryUsecase } from "usecases/category/update-status.category.usecase";
import { IGetActivityUsecaseInterface } from "entities/usecaseInterfaces/activity/get-activity.usecase.interface";
import { GetActivityUsecase } from "usecases/activity/get-actvitiy.usecase";
import { IAddActivityUsecaseInterface } from "entities/usecaseInterfaces/activity/add-activity.usecase.interface";
import { AddActivityUsecase } from "usecases/activity/add-activity.usecase";
import { IEditActivityUsecaseInterface } from "entities/usecaseInterfaces/activity/edit-activity.usecase.interface";
import { EditActivityUsecase } from "usecases/activity/edit-activity.usecase";
import { ICreateBlogUsecaseInterface } from "entities/usecaseInterfaces/blog/create-blog.usecase.interface";
import { CreateBlogUsecase } from "usecases/blog/create-blog.usecase";
import { IGetAllBlogUsecaseInterface } from "entities/usecaseInterfaces/blog/get-all-blog.usecase.interface";
import { GetAllBlogUsecase } from "usecases/blog/get-all-blog.usecase";
import { IEditBlogUsecaseInterface } from "entities/usecaseInterfaces/blog/edit-blog.usecase.interface";
import { EditBlogUsecase } from "usecases/blog/edit-blog.usecase";
import { GetAllCategoryNameUsecase } from "usecases/category/get-all-category-name.usecase";
import { IGetAllCategoryNameUsecaseInterface } from "entities/usecaseInterfaces/category/get-all-category-names.usecase.interface";
import { IRefreshTokenUsecaseInterface } from "entities/usecaseInterfaces/auth/refresh-token.usecase.interface";
import { RefreshTokenUsecase } from "usecases/auth/refresh-token.usecase";
import { IRevokeRefreshTokenUsecaseInterface } from "entities/usecaseInterfaces/auth/revok-refresh-token.usecase.interface";
import { RevokeRefreshTokenUsecase } from "usecases/auth/revoke-refresh-token.usecase";
import { IGetActivityDetailsUsecaseInterface } from "entities/usecaseInterfaces/activity/get-activity-details.usecase.interface";
import { GetActivityDetailsUsecase } from "usecases/activity/get-activity-details.usecase";
import { IBookActivityUsecaseInterface } from "entities/usecaseInterfaces/booking/book.activity.usecase.interface";
import { BookActivityUsecase } from "usecases/booking/book.activity.usecase";
import { IpaymentService } from "entities/serviceInterfaces/razorpay-service.interface";
import { RazorpayService } from "interfaceAdapters/services/razorpay-services";
import { IGetFilteredAcitivityUsecaseInterface } from "entities/usecaseInterfaces/activity/get-filtered-activity.usecase.interface";
import { GetFilteredActivityUsecase } from "usecases/activity/get-filtered-activity.usecase";
import { ICheckBookingAvailabiltyUsecase } from "entities/usecaseInterfaces/booking/check-availabilty.usecase.interface";
import { CheckBookingAvailabilityUsecase } from "usecases/booking/check-availability.usecase";
import { ICreateOrderUsecase } from "entities/usecaseInterfaces/booking/create-order.usecase.interface";
import { CreateOrderUsecase } from "usecases/booking/create-order.usecase";

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

    container.register<IpaymentService>("IPaymentService", {
      useClass: RazorpayService,
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

    container.register<IGetAllCategoryUsecaseInterface>(
      "IGetAllCategoryUsecase",
      {
        useClass: GetAllCategoryUsecase,
      },
    );

    container.register<IAddCategoryUsecaseInterface>("IAddCategoryUsecase", {
      useClass: AddCategoryUseCase,
    });

    container.register<IEditCategoryUsecaseInterface>("IEditCategoryUsecase", {
      useClass: EditCategoryUsecase,
    });

    container.register<IUpdateCategoryUsecaseInterface>(
      "IUpdateCategoryUsecase",
      {
        useClass: UpdateStatusCategoryUsecase,
      },
    );

    container.register<IGetAllCategoryNameUsecaseInterface>(
      "IGetAllCategoryNameUsecase",
      {
        useClass: GetAllCategoryNameUsecase,
      },
    );

    container.register<IGetActivityUsecaseInterface>("IGetActivityUsecase", {
      useClass: GetActivityUsecase,
    });

    container.register<IAddActivityUsecaseInterface>("IAddActivityUsecase", {
      useClass: AddActivityUsecase,
    });

    container.register<IEditActivityUsecaseInterface>("IEditActivityUsecase", {
      useClass: EditActivityUsecase,
    });

    container.register<ICreateBlogUsecaseInterface>("ICreateBlogUsecase", {
      useClass: CreateBlogUsecase,
    });

    container.register<IGetAllBlogUsecaseInterface>("IGetAllBlogUsecase", {
      useClass: GetAllBlogUsecase,
    });

    container.register<IEditBlogUsecaseInterface>("IEditBlogUsecase", {
      useClass: EditBlogUsecase,
    });

    container.register<IRefreshTokenUsecaseInterface>("IRefreshTokenUsecase", {
      useClass: RefreshTokenUsecase,
    });

    container.register<IRevokeRefreshTokenUsecaseInterface>(
      "IRevokeRefreshTokenUsecase",
      {
        useClass: RevokeRefreshTokenUsecase,
      },
    );

    container.register<IGetActivityDetailsUsecaseInterface>(
      "IGetActivityDetailsUsecase",
      {
        useClass: GetActivityDetailsUsecase,
      },
    );

    container.register<IBookActivityUsecaseInterface>("IBookActivityUsecase", {
      useClass: BookActivityUsecase,
    });

    container.register<IGetFilteredAcitivityUsecaseInterface>(
      "IGetFilteredActivityUsecase",
      {
        useClass: GetFilteredActivityUsecase,
      },
    );

    container.register<ICheckBookingAvailabiltyUsecase>(
      "ICheckAvailabilityUsecase",
      {
        useClass: CheckBookingAvailabilityUsecase,
      },
    );

    container.register<ICreateOrderUsecase>("ICreateOrderUsecase", {
      useClass: CreateOrderUsecase,
    });
  }
}
