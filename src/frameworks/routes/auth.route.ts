import { NextFunction, Request, Response } from "express";
import { authController } from "../di/resolver";
import passport from "passport";
import upload from "../multer/multer";
import { BaseRoute } from "./base.route";

export class AuthRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.post(
      "/send-otp",
      (req: Request, res: Response, next: NextFunction) => {
        console.log("sfnslkbnsbnsnkld");
        next();
      },
      upload.any(),
      (req: Request, res: Response, next: NextFunction) => {
        console.log("sfnslkbnsbnsnkld");
        next();
      },
      (req: Request, res: Response, next: NextFunction) => {
        authController.send_otp(req, res, next);
      },
    );

    this.router.post(
      "/resend-otp",
      (req: Request, res: Response, next: NextFunction) => {
        authController.resend_otp(req, res, next);
      },
    );

    this.router.post(
      "/register",
      (req: Request, res: Response, next: NextFunction) => {
        authController.register(req, res, next);
      },
    );

    this.router.post(
      "/login",
      (req: Request, res: Response, next: NextFunction) => {
        authController.login(req, res, next);
      },
    );

    this.router.post(
      "/forgot-password",
      (req: Request, res: Response, next: NextFunction) => {
        authController.forgotPassword(req, res, next);
      },
    );

    this.router.patch(
      "/reset-password/:role/:id/:token",
      (req: Request, res: Response, next: NextFunction) => {
        authController.resetPassword(req, res, next);
      },
    );

    this.router.post(
      "/verify-token",
      (req: Request, res: Response, next: NextFunction) => {
        authController.verifyToken(req, res, next);
      },
    );

    this.router.post(
      "/auth/refresh-token",
      (req: Request, res: Response, next: NextFunction) => {
        authController.refreshToken(req, res, next);
      },
    );

    this.router.get("/auth/google", (req: Request, res: Response, next) => {
      console.log("google route end hit");
      const role = req.query.role as string;
      passport.authenticate("google", {
        scope: ["profile", "email"],
        state: role,
      })(req, res, next);
      console.log("qwertyuio");
    });

    this.router.get(
      "/auth/google/callback",
      passport.authenticate("google", { failureRedirect: "/login" }),

      function (req: Request, res: Response, next: NextFunction) {
        authController.googleLogin(req, res, next);
      },
    );

    this.router.post(
      "/logout/:role",
      (req: Request, res: Response, next: NextFunction) => {
        authController.logout(req, res, next);
      },
    );

    this.router.get(
      "/get-profile",
      (req: Request, res: Response, next: NextFunction) => {
        authController.getProfile(req, res, next);
      },
    );
  }
}
