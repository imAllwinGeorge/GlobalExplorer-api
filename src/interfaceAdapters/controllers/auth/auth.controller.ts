import { Request, Response } from "express";
import { IAuthController } from "../../../entities/controllerInterfaces/users/auth-controller.interface";
import { IRegisterUsecase } from "../../../entities/usecaseInterfaces/auth/register-usecase.interface";
import { inject, injectable } from "tsyringe";
import { userSchema } from "./validations/user-signup.validatiion.schema";
import { ISendOtpUsecaseInterface } from "../../../entities/usecaseInterfaces/auth/send-otp.usecase.interface";
import { IGenerateTokenInterface } from "../../../entities/usecaseInterfaces/auth/generate_token-usecase.interface";
import { loginShcema } from "./validations/user-login.validation.scema";
import { ILoginUserInterface } from "../../../entities/usecaseInterfaces/auth/login-user.usecase.interface";
import { forgotPasswordSchema } from "./validations/forgot-password.validation.schema";
import { IForgotPasswordUsecaseInterface } from "../../../entities/usecaseInterfaces/auth/forgot-password.usecase.interface";
import { IResetPasswordUseCaseInterface } from "../../../entities/usecaseInterfaces/auth/reset-password.usecase.interface";
import { IVerifyTokenUsecaseInterface } from "../../../entities/usecaseInterfaces/auth/verify-token.usecase.interface";
import { IGoogleLoginUsecaseInterface } from "../../../entities/usecaseInterfaces/auth/google_login.usecase.interface";
import jwt from "jsonwebtoken";
import { hostSchema } from "./validations/host-signup.validation.schema";
import { z, ZodError } from "zod";
import { HttpStatusCode } from "shared/constants/statusCodes";
const { JsonWebTokenError } = jwt;

type UserData = z.infer<typeof userSchema>;
type HostData = z.infer<typeof hostSchema>;
@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject("ISendOtpUsecase")
    private _sendOtpUsecase: ISendOtpUsecaseInterface,

    @inject("IRegisterUseCase")
    private _registerUseCase: IRegisterUsecase,

    @inject("IGeneratorUsecase")
    private _generateTokenUsecase: IGenerateTokenInterface,

    @inject("ILoginUserUsecase")
    private _loginUserUsecase: ILoginUserInterface,

    @inject("IForgotPasswordUsecase")
    private _forgotPasswordUsecase: IForgotPasswordUsecaseInterface,

    @inject("IResetPasswordUsecase")
    private _resetPasswordUsecase: IResetPasswordUseCaseInterface,

    @inject("IVerifyTokenUsecase")
    private _verifyTokenUsecase: IVerifyTokenUsecaseInterface,

    @inject("IGoogleLoginUsecase")
    private _googleLoginUsecase: IGoogleLoginUsecaseInterface,
  ) {}

  async send_otp(req: Request, res: Response): Promise<void> {
    try {
      console.log(req);
      const { role } = req.body;
      console.log(role);
      console.log(req.files);
      console.log("fsowiegiowg9839238497423894283", role);
      let userData: UserData | HostData | null = null;
      if (role === "user") {
        userData = userSchema.parse(req.body);
      } else if (role === "host") {
        const parsedData = hostSchema.parse(req.body);
        // Create a mutable copy
        userData = { ...parsedData };

        const files = req.files as Express.Multer.File[];

        type HostFileFields =
          | "kyc_idProof"
          | "kyc_addressProof"
          | "kyc_panCard"
          | "registrationCertificate"
          | "safetyCertificate"
          | "license"
          | "insurance";

        files?.forEach((file) => {
          const key = file.fieldname;

          if (key === "role") {
            // Optional: You can decide if you actually want to do this
            (userData as HostData).role = file.filename as
              | "user"
              | "host"
              | "admin";
          } else if (
            [
              "kyc_idProof",
              "kyc_addressProof",
              "kyc_panCard",
              "registrationCertificate",
              "safetyCertificate",
              "license",
              "insurance",
            ].includes(key)
          ) {
            (userData as HostData)[key as HostFileFields] = file.filename;
          }
        });
      } else {
        userData = null;
      }
      console.log(userData);
      if (!userData) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: "Invalid Role" });
        return;
      }
      const otp = await this._sendOtpUsecase.execute(
        userData.email,
        userData.role,
      );
      req.session.userData = {
        ...userData,
        otp,
      };
      res.status(HttpStatusCode.OK).json({ message: "otp sented successful" });
      return;
    } catch (error) {
      console.log("check this error: ", error);
      if (error instanceof Error && error.message === "Email already exist") {
        console.log("qwertyu");
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: "Email already exists" });
      } else if (error instanceof ZodError) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: error.errors[0].message });
      } else {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal server Error." });
      }
    }
  }

  async resend_otp(req: Request, res: Response): Promise<void> {
    try {
      const { userData } = req.session;
      if (!userData) {
        res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json({ message: "token expired" });
        return;
      }
      const otp = await this._sendOtpUsecase.execute(
        userData.email,
        userData.role,
      );
      req.session.userData = {
        ...userData,
        otp,
      };
      res.status(HttpStatusCode.OK).json({ message: "otp sented successful" });
      return;
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { otp } = req.body;
      const { userData } = req.session;
      if (!userData) {
        res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json({ message: "session expired, please try again" });
        return;
      }
      if (otp.toString() !== userData.otp) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: "invalid otp" });
        return;
      }

      const user = await this._registerUseCase.execute(userData);
      const { accessToken } = await this._generateTokenUsecase.execute(
        user._id,
        user.email,
        user.role,
      );

      res.cookie(`${userData.role}AccessToken`, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res
        .status(HttpStatusCode.CREATED)
        .json({ message: "user saved successfully", user });
      return;
    } catch (error) {
      console.log("user signup error: ", error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { data } = req.body;
      console.log("login data: ", data);
      const validateData = loginShcema.parse(data);
      if (!validateData) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: "Invalid email or password" });
        return;
      }
      const userData = await this._loginUserUsecase.execute(data);
      if (!userData) {
        res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json({ message: "Invalid email or password!" });
        return;
      }

      if (userData.isBlocked) {
        res
          .status(HttpStatusCode.FORBIDDEN)
          .json({ message: "Account access restricted by admin." });
        return;
      }

      const { accessToken } = await this._generateTokenUsecase.execute(
        userData?._id,
        userData.email,
        userData.role,
      );
      res.cookie(`${userData.role}AccessToken`, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "productiion",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
      console.log(userData, accessToken);
      res
        .status(HttpStatusCode.OK)
        .json({ message: "user login successful", user: userData });
    } catch (error) {
      console.log(error);

      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "server error" });
    }
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email, role } = req.body;
      console.log(email);
      const validateEmail = forgotPasswordSchema.parse({ email });
      if (!validateEmail) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: "emailvalidation error, please enter valid email" });
        return;
      }
      const url = await this._forgotPasswordUsecase.execute(email, role);
      res
        .status(HttpStatusCode.OK)
        .json({ message: "Recovery link sented to your email", url });
      return;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { id, token, role } = req.params;
      const { password } = req.body;
      const user = await this._resetPasswordUsecase.execute(
        id,
        role,
        token,
        password,
      );
      if (!user) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: "Bad request" });
        return;
      }
      res.status(HttpStatusCode.OK).json({ message: "password updated" });
      return;
    } catch (error) {
      console.log("error:", error);
      if (error instanceof JsonWebTokenError) {
        res
          .status(HttpStatusCode.FORBIDDEN)
          .json({ message: "Token expired. Please try again " });
        return;
      }
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }

  async verifyToken(req: Request, res: Response) {
    try {
      let role;
      let token;
      if (req.cookies.userAccessToken) {
        token = req.cookies.userAccessToken;
        role = "user";
        console.log("userAccessToken encountered");
      } else if (req.cookies.adminAccessToken) {
        token = req.cookies.adminAccessToken;
        role = "admin";
        console.log("adminAccessToken encountered");
      } else {
        throw new Error("session expired");
      }

      const isVerified = await this._verifyTokenUsecase.execute(token, role);
      console.log(isVerified);
      if (!isVerified) {
        res
          .status(HttpStatusCode.FORBIDDEN)
          .json({ message: "session Expired!" });
      }

      res.status(HttpStatusCode.OK).json({ message: "token verified" });
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }

  async googleLogin(req: Request, res: Response): Promise<void> {
    try {
      const role = req.query.state;
      const { user } = req;
      if (!user || !role) {
        throw new Error("google login error");
      }
      const googleUser = await this._googleLoginUsecase.execute(
        user,
        role as string,
      );

      if (!googleUser) {
        throw new Error("google signup failed");
      }

      const { accessToken } = await this._generateTokenUsecase.execute(
        googleUser?._id,
        googleUser.email,
        googleUser.role,
      );

      const userData = encodeURIComponent(
        JSON.stringify({
          firstName: googleUser.firstName,
          lastName: googleUser.lastName,
          email: googleUser.email,
          role: googleUser.role,
          _id: googleUser._id,
        }),
      );
      res.cookie(`${googleUser.role}AccessToken`, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "productiion",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.redirect(`http://localhost:5173/login?user=${userData}`);
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const { role } = req.params;
      console.log("logout role", role);
      res.cookie(`${role}AccessToken`, "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
        sameSite: "strict",
      });

      res.status(HttpStatusCode.OK).json({ message: "logout" });
    } catch (error) {
      console.log("logout Error :", error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }
}
