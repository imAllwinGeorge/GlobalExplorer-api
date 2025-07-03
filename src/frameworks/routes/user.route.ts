import { Request, Response } from "express";
import { authController, userController } from "../di/resolver";
import { verifyToken } from "interfaceAdapters/middleware/auth.middleware";
import { BaseRoute } from "./base.route";

export class UserRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.post("/login", (req: Request, res: Response) => {
      authController.login(req, res);
    });

    this.router.get(
      "/get-users/:role",
      verifyToken,
      (req: Request, res: Response) => {
        userController.getAllUsers(req, res);
      },
    );

    this.router.post(
      "/update-status/:role",
      verifyToken,
      (req: Request, res: Response) => {
        userController.updateStatus(req, res);
      },
    );

    this.router.get("/get-user", verifyToken, (req: Request, res: Response) => {
      userController.getUser(req, res);
    });
  }
}
