import { Request, Response, Router } from "express";
import { authController, userController } from "../di/resolver";

export class AdminRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post("/login", (req: Request, res: Response) => {
      authController.login(req, res);
    });

    this.router.get("/get-users/:role", (req: Request, res: Response) => {
      userController.getAllUsers(req, res);
    });

    this.router.post("/update-status", (req: Request, res: Response) => {
      userController.updateStatus(req, res);
    });
  }
}
