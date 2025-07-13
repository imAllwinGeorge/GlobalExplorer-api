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
      (req: Request, res: Response) => {
        authController.send_otp(req, res);
      },
    );

    this.router.post("/resend-otp", (req: Request, res: Response) => {
      authController.resend_otp(req, res);
    });

    this.router.post("/register", (req: Request, res: Response) => {
      authController.register(req, res);
    });

    this.router.post("/login", (req: Request, res: Response) => {
      authController.login(req, res);
    });

    this.router.post("/forgot-password", (req: Request, res: Response) => {
      authController.forgotPassword(req, res);
    });

    this.router.patch(
      "/reset-password/:role/:id/:token",
      (req: Request, res: Response) => {
        authController.resetPassword(req, res);
      },
    );

    this.router.post("/verify-token", (req: Request, res: Response) => {
      authController.verifyToken(req, res);
    });

    this.router.post("/auth/refresh-token", (req: Request, res: Response) => {
      authController.refreshToken(req, res);
    });

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

      function (req: Request, res: Response) {
        authController.googleLogin(req, res);
      },
    );

    this.router.post("/logout/:role", (req: Request, res: Response) => {
      authController.logout(req, res);
    });
  }
}
