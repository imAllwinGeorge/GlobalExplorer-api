import { container } from "tsyringe";
import { RegisterUserusecase } from "../../usecases/auth/register-user.usecase";
import { IRegisterUsecase } from "../../entities/usecaseInterfaces/auth/register-usecase.interface";
import { IUserExistanceService } from "../../entities/serviceInterfaces/user-existance-service.interface";
import { UserExistanceService } from "../../interfaceAdapters/services/user-existence.service";
import { ISendOtpUsecase } from "../../entities/usecaseInterfaces/auth/send-otp.usecase.interface";
import { SendOtpUsecase } from "../../usecases/auth/send-otp.usecase";
import { IBcrypt } from "../../entities/security/bcrypt.interface";
import { PasswordBcrypt } from "../security/password-bcrypt";
import { IOtpService } from "../../entities/serviceInterfaces/otp-service.interface";
import { OtpService } from "../../interfaceAdapters/services/otp-service";
import { IEmailSevices } from "../../entities/serviceInterfaces/email-services.interface";
import { EmailServices } from "../../interfaceAdapters/services/email-services";
import { IJwtservice } from "../../entities/serviceInterfaces/jwt-services.interface";
import { JwtService } from "../../interfaceAdapters/services/jwt-service";
import { IGenerateToken } from "../../entities/usecaseInterfaces/auth/generate_token-usecase.interface";
import { GenerateToken } from "../../usecases/auth/generate_token.usecase";
import { ILoginUser } from "../../entities/usecaseInterfaces/auth/login-user.usecase.interface";
import { LoginUsecase } from "../../usecases/auth/login-user.usecase";
import { IForgotPasswordUsecase } from "../../entities/usecaseInterfaces/auth/forgot-password.usecase.interface";
import { ForgotPasswordUsecase } from "../../usecases/auth/forgot-password.usecase";
import { ResetPasswordUsecase } from "../../usecases/auth/reset-password.usecase";
import { IResetPasswordUseCase } from "../../entities/usecaseInterfaces/auth/reset-password.usecase.interface";
import { IVerifyTokenUsecase } from "../../entities/usecaseInterfaces/auth/verify-token.usecase.interface";
import { VerifyTokenUsecase } from "../../usecases/auth/verfiy-token.usecase";
import { IGoogleLoginUsecase } from "../../entities/usecaseInterfaces/auth/google_login.usecase.interface";
import { GoogleLoginUsecase } from "../../usecases/auth/google_login.usecase";
import { IGetAllUsersUsecase } from "../../entities/usecaseInterfaces/user/get-all-user.usecase.interface";
import { GetAllUsersUsecase } from "../../usecases/user/get-all-user.usecase";
import { IUpdateStatusUsecase } from "../../entities/usecaseInterfaces/user/update-status.usecase.interface";
import { UpdateStatusUsecase } from "../../usecases/user/update-status.usecase";
import { IGetUserUsecase } from "entities/usecaseInterfaces/user/get-user.usecase.interface";
import { GetUserUsecase } from "usecases/user/get-user.usecase";
import { IGetAllCategoryUsecase } from "entities/usecaseInterfaces/category/get-all-category.usecase.interface";
import { GetAllCategoryUsecase } from "usecases/category/get-all-category.usecase";
import { IAddCategoryUsecase } from "entities/usecaseInterfaces/category/add-category.usecase.interface";
import { AddCategoryUseCase } from "usecases/category/add-category.usecase";
import { IEditCategoryUsecase } from "entities/usecaseInterfaces/category/edit-category.usecase.interface";
import { EditCategoryUsecase } from "usecases/category/edit-category.usecase";
import { IUpdateCategoryUsecase } from "entities/usecaseInterfaces/category/update-category.usecase.interface";
import { UpdateStatusCategoryUsecase } from "usecases/category/update-status.category.usecase";
import { IGetActivityUsecase } from "entities/usecaseInterfaces/activity/get-activity.usecase.interface";
import { GetActivityUsecase } from "usecases/activity/get-actvitiy.usecase";
import { IAddActivityUsecase } from "entities/usecaseInterfaces/activity/add-activity.usecase.interface";
import { AddActivityUsecase } from "usecases/activity/add-activity.usecase";
import { IEditActivityUsecase } from "entities/usecaseInterfaces/activity/edit-activity.usecase.interface";
import { EditActivityUsecase } from "usecases/activity/edit-activity.usecase";
import { ICreateBlogUsecase } from "entities/usecaseInterfaces/blog/create-blog.usecase.interface";
import { CreateBlogUsecase } from "usecases/blog/create-blog.usecase";
import { IGetAllBlogUsecase } from "entities/usecaseInterfaces/blog/get-all-blog.usecase.interface";
import { GetAllBlogUsecase } from "usecases/blog/get-all-blog.usecase";
import { IEditBlogUsecase } from "entities/usecaseInterfaces/blog/edit-blog.usecase.interface";
import { EditBlogUsecase } from "usecases/blog/edit-blog.usecase";
import { GetAllCategoryNameUsecase } from "usecases/category/get-all-category-name.usecase";
import { IGetAllCategoryNameUsecase } from "entities/usecaseInterfaces/category/get-all-category-names.usecase.interface";
import { IRefreshTokenUsecase } from "entities/usecaseInterfaces/auth/refresh-token.usecase.interface";
import { RefreshTokenUsecase } from "usecases/auth/refresh-token.usecase";
import { IRevokeRefreshTokenUsecase } from "entities/usecaseInterfaces/auth/revok-refresh-token.usecase.interface";
import { RevokeRefreshTokenUsecase } from "usecases/auth/revoke-refresh-token.usecase";
import { IGetActivityDetailsUsecase } from "entities/usecaseInterfaces/activity/get-activity-details.usecase.interface";
import { GetActivityDetailsUsecase } from "usecases/activity/get-activity-details.usecase";
import { IBookActivityUsecase } from "entities/usecaseInterfaces/booking/book.activity.usecase.interface";
import { BookActivityUsecase } from "usecases/booking/book.activity.usecase";
import { IpaymentService } from "entities/serviceInterfaces/razorpay-service.interface";
import { RazorpayService } from "interfaceAdapters/services/razorpay-services";
import { IGetFilteredAcitivityUsecase } from "entities/usecaseInterfaces/activity/get-filtered-activity.usecase.interface";
import { GetFilteredActivityUsecase } from "usecases/activity/get-filtered-activity.usecase";
import { ICheckBookingAvailabiltyUsecase } from "entities/usecaseInterfaces/booking/check-availabilty.usecase.interface";
import { CheckBookingAvailabilityUsecase } from "usecases/booking/check-availability.usecase";
import { ICreateOrderUsecase } from "entities/usecaseInterfaces/booking/create-order.usecase.interface";
import { CreateOrderUsecase } from "usecases/booking/create-order.usecase";
import { IGetProfileUsecase } from "entities/usecaseInterfaces/auth/get-profile.usecase.interface";
import { GetProfileUsecase } from "usecases/auth/get-profile.usecase";
import { IGetBookedActivityUsecase } from "entities/usecaseInterfaces/booking/get-bookings.usecase.interface";
import { GetBookedActivityUsecase } from "usecases/booking/get-bookings.usecase";
import { ICancelBookingUsecase } from "entities/usecaseInterfaces/booking/cancel.booking.usecase.interface";
import { CancelBookingUsecase } from "usecases/booking/cancel.booking.usecase";
import { IGetMyBlogsUsecase } from "entities/usecaseInterfaces/blog/get-my-blog.usecase.interface";
import { GetMyBlogsUsecase } from "usecases/blog/get-my-blog.usecase";

export class UsecaseRegistery {
  static registerUsecases(): void {
    container.register<IRegisterUsecase>("IRegisterUseCase", {
      useClass: RegisterUserusecase,
    });

    container.register<ILoginUser>("ILoginUserUsecase", {
      useClass: LoginUsecase,
    });

    container.register<IUserExistanceService>("IUserExistanceService", {
      useClass: UserExistanceService,
    });
    container.register<ISendOtpUsecase>("ISendOtpUsecase", {
      useClass: SendOtpUsecase,
    });

    container.register<IForgotPasswordUsecase>("IForgotPasswordUsecase", {
      useClass: ForgotPasswordUsecase,
    });

    container.register<IResetPasswordUseCase>("IResetPasswordUsecase", {
      useClass: ResetPasswordUsecase,
    });

    container.register<IVerifyTokenUsecase>("IVerifyTokenUsecase", {
      useClass: VerifyTokenUsecase,
    });

    container.register<IBcrypt>("IPasswordBcrypt", {
      useClass: PasswordBcrypt,
    });

    container.register<IOtpService>("IOtpService", {
      useClass: OtpService,
    });

    container.register<IGenerateToken>("IGeneratorUsecase", {
      useClass: GenerateToken,
    });

    container.register<IEmailSevices>("IEmailServices", {
      useClass: EmailServices,
    });

    container.register<IJwtservice>("IJwtService", {
      useClass: JwtService,
    });

    container.register<IpaymentService>("IPaymentService", {
      useClass: RazorpayService,
    });

    container.register<IGoogleLoginUsecase>("IGoogleLoginUsecase", {
      useClass: GoogleLoginUsecase,
    });

    container.register<IGetAllUsersUsecase>("IGetAllUsersUsecase", {
      useClass: GetAllUsersUsecase,
    });

    container.register<IUpdateStatusUsecase>("IUpdateStatusUsecase", {
      useClass: UpdateStatusUsecase,
    });

    container.register<IGetUserUsecase>("IGetUserUsecase", {
      useClass: GetUserUsecase,
    });

    container.register<IGetAllCategoryUsecase>("IGetAllCategoryUsecase", {
      useClass: GetAllCategoryUsecase,
    });

    container.register<IAddCategoryUsecase>("IAddCategoryUsecase", {
      useClass: AddCategoryUseCase,
    });

    container.register<IEditCategoryUsecase>("IEditCategoryUsecase", {
      useClass: EditCategoryUsecase,
    });

    container.register<IUpdateCategoryUsecase>("IUpdateCategoryUsecase", {
      useClass: UpdateStatusCategoryUsecase,
    });

    container.register<IGetAllCategoryNameUsecase>(
      "IGetAllCategoryNameUsecase",
      {
        useClass: GetAllCategoryNameUsecase,
      },
    );

    container.register<IGetActivityUsecase>("IGetActivityUsecase", {
      useClass: GetActivityUsecase,
    });

    container.register<IAddActivityUsecase>("IAddActivityUsecase", {
      useClass: AddActivityUsecase,
    });

    container.register<IEditActivityUsecase>("IEditActivityUsecase", {
      useClass: EditActivityUsecase,
    });

    container.register<ICreateBlogUsecase>("ICreateBlogUsecase", {
      useClass: CreateBlogUsecase,
    });

    container.register<IGetAllBlogUsecase>("IGetAllBlogUsecase", {
      useClass: GetAllBlogUsecase,
    });

    container.register<IEditBlogUsecase>("IEditBlogUsecase", {
      useClass: EditBlogUsecase,
    });

    container.register<IRefreshTokenUsecase>("IRefreshTokenUsecase", {
      useClass: RefreshTokenUsecase,
    });

    container.register<IRevokeRefreshTokenUsecase>(
      "IRevokeRefreshTokenUsecase",
      {
        useClass: RevokeRefreshTokenUsecase,
      },
    );

    container.register<IGetActivityDetailsUsecase>(
      "IGetActivityDetailsUsecase",
      {
        useClass: GetActivityDetailsUsecase,
      },
    );

    container.register<IBookActivityUsecase>("IBookActivityUsecase", {
      useClass: BookActivityUsecase,
    });

    container.register<IGetFilteredAcitivityUsecase>(
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

    container.register<IGetProfileUsecase>("IGetProfileUsecase", {
      useClass: GetProfileUsecase,
    });

    container.register<IGetBookedActivityUsecase>("IGetBookedActivityUsecase", {
      useClass: GetBookedActivityUsecase,
    });

    container.register<ICancelBookingUsecase>("ICancelBookingUsecase", {
      useClass: CancelBookingUsecase,
    });

    container.register<IGetMyBlogsUsecase>("IGetMyBlogUsecase", {
      useClass: GetMyBlogsUsecase,
    });
  }
}
