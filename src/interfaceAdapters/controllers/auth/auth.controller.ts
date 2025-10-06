import { Request, Response } from "express";
import { IAuthController } from "../../../entities/controllerInterfaces/users/auth-controller.interface";
import { IRegisterUsecase } from "../../../entities/usecaseInterfaces/auth/register-usecase.interface";
import { inject, injectable } from "tsyringe";
import { userSchema } from "./validations/user-signup.validatiion.schema";
import { ISendOtpUsecase } from "../../../entities/usecaseInterfaces/auth/send-otp.usecase.interface";
import { IGenerateToken } from "../../../entities/usecaseInterfaces/auth/generate_token-usecase.interface";
import { loginShcema } from "./validations/user-login.validation.scema";
import { ILoginUser } from "../../../entities/usecaseInterfaces/auth/login-user.usecase.interface";
import { forgotPasswordSchema } from "./validations/forgot-password.validation.schema";
import { IForgotPasswordUsecase } from "../../../entities/usecaseInterfaces/auth/forgot-password.usecase.interface";
import { IResetPasswordUseCase } from "../../../entities/usecaseInterfaces/auth/reset-password.usecase.interface";
import { IVerifyTokenUsecase } from "../../../entities/usecaseInterfaces/auth/verify-token.usecase.interface";
import { IGoogleLoginUsecase } from "../../../entities/usecaseInterfaces/auth/google_login.usecase.interface";
import jwt from "jsonwebtoken";
import { hostSchema } from "./validations/host-signup.validation.schema";
import { z, ZodError } from "zod";

import dotenv from "dotenv";
import { IRefreshTokenUsecase } from "../../../entities/usecaseInterfaces/auth/refresh-token.usecase.interface";
import { IRevokeRefreshTokenUsecase } from "../../../entities/usecaseInterfaces/auth/revok-refresh-token.usecase.interface";
import { IGetProfileUsecase } from "../../../entities/usecaseInterfaces/auth/get-profile.usecase.interface";
import { HttpStatusCode, ROLE } from "../../../shared/constants/constants";
import {
  clearAuthCookies,
  setAuthCookies,
} from "../../../shared/utils/cookie.helper";
dotenv.config();

const frontEndUrl = process.env.FRONT_END_URL;
const { JsonWebTokenError } = jwt;

type UserData = z.infer<typeof userSchema>;
type HostData = z.infer<typeof hostSchema>;
@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject("ISendOtpUsecase")
    private _sendOtpUsecase: ISendOtpUsecase,

    @inject("IRegisterUseCase")
    private _registerUseCase: IRegisterUsecase,

    @inject("IGeneratorUsecase")
    private _generateTokenUsecase: IGenerateToken,

    @inject("ILoginUserUsecase")
    private _loginUserUsecase: ILoginUser,

    @inject("IForgotPasswordUsecase")
    private _forgotPasswordUsecase: IForgotPasswordUsecase,

    @inject("IResetPasswordUsecase")
    private _resetPasswordUsecase: IResetPasswordUseCase,

    @inject("IVerifyTokenUsecase")
    private _verifyTokenUsecase: IVerifyTokenUsecase,

    @inject("IGoogleLoginUsecase")
    private _googleLoginUsecase: IGoogleLoginUsecase,

    @inject("IRefreshTokenUsecase")
    private _refreshTokenUsecase: IRefreshTokenUsecase,

    @inject("IRevokeRefreshTokenUsecase")
    private _revokeRefreshTokenUsecase: IRevokeRefreshTokenUsecase,

    @inject("IGetProfileUsecase")
    private _getProfileUsecase: IGetProfileUsecase,
  ) {}

  async send_otp(req: Request, res: Response): Promise<void> {
    try {
      const { role } = req.body;

      let userData: UserData | HostData | null = null;

      if (role === ROLE.USER) {
        userData = userSchema.parse(req.body);
      } else if (role === ROLE.HOST) {
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
      if (error instanceof Error && error.message === "Email already exist") {
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
          .json({ message: "session expired. Please try again" });
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
      const tokens = await this._generateTokenUsecase.execute(
        user._id,
        user.email,
        user.role,
      );

      const accessTokenName = `${user.role}AccessToken`;
      const refreshTokenName = `${user.role}RefreshToken`;

      setAuthCookies(
        res,
        tokens.accessToken,
        tokens.refreshToken,
        accessTokenName,
        refreshTokenName,
      );

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
          .status(HttpStatusCode.UNAUTHORIZED)
          .json({ message: "Account access restricted by admin." });
        return;
      }

      const tokens = await this._generateTokenUsecase.execute(
        userData?._id,
        userData.email,
        userData.role,
      );
      const accessTokenName = `${userData.role}AccessToken`;
      const refreshTokenName = `${userData.role}RefreshToken`;
      setAuthCookies(
        res,
        tokens.accessToken,
        tokens.refreshToken,
        accessTokenName,
        refreshTokenName,
      );
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
          .json({ message: "Token Expired." });
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
        role = ROLE.USER;
        console.log("userAccessToken encountered");
      } else if (req.cookies.adminAccessToken) {
        token = req.cookies.adminAccessToken;
        role = ROLE.ADMIN;
        console.log("adminAccessToken encountered");
      } else {
        throw new Error("session expired");
      }

      const isVerified = await this._verifyTokenUsecase.execute(token, role);
      console.log(isVerified);
      if (!isVerified) {
        res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json({ message: "Token Expired." });
      }

      res.status(HttpStatusCode.OK).json({ message: "token verified" });
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { role } = req.body;
      let token;
      if (role === ROLE.USER) {
        token = req.cookies.userRefreshToken;
      } else if (role === ROLE.HOST) {
        token = req.cookies.hostRefreshToken;
      } else if (role === ROLE.ADMIN) {
        token = req.cookies.adminRefreshToken;
      }

      const payload = await this._refreshTokenUsecase.execute(token);
      const tokens = await this._generateTokenUsecase.execute(
        payload.userId,
        payload.email,
        payload.role,
      );
      const accessTokenName = `${role}AccessToken`;
      const refreshTokenName = `${role}RefreshToken`;
      setAuthCookies(
        res,
        tokens.accessToken,
        tokens.refreshToken,
        accessTokenName,
        refreshTokenName,
      );
      res.status(HttpStatusCode.OK).json({ message: "Token validated" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(HttpStatusCode.FORBIDDEN).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: "Internal Server Error" });
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

      const tokens = await this._generateTokenUsecase.execute(
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
      const accessTokenName = `${googleUser.role}AccessToken`;
      const refreshTokenName = `${googleUser.role}RefreshToken`;
      setAuthCookies(
        res,
        tokens.accessToken,
        tokens.refreshToken,
        accessTokenName,
        refreshTokenName,
      );
      res.redirect(`${frontEndUrl}/login?user=${userData}`);
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const { role } = req.params;
      let refreshToken;
      if (role === ROLE.ADMIN) {
        refreshToken = req.cookies.adminRefreshToken;
      } else if (role === ROLE.HOST) {
        refreshToken = req.cookies.hostRefreshToken;
      } else if (role === ROLE.USER) {
        refreshToken = req.cookies.userRefreshToken;
      }
      const accessTokenName = `${role}AccessToken`;
      const refreshTokenName = `${role}RefreshToken`;
      await this._revokeRefreshTokenUsecase.execute(refreshToken);
      clearAuthCookies(res, accessTokenName, refreshTokenName);

      res.status(HttpStatusCode.OK).json({ message: "logout" });
    } catch (error) {
      console.log("logout Error :", error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }

  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const id = req.query.id as string;
      const role = req.query.role as string;
      const profile = await this._getProfileUsecase.execute(id, role);
      res.status(HttpStatusCode.OK).json({ user: profile });
    } catch (error) {
      if (error instanceof Error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
        return;
      }
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }
}
