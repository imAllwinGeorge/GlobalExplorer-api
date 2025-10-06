import { Request, Response, Router } from "express";
import {
  activityController,
  authController,
  categoryController,
  dashboardController,
  userController,
} from "../di/resolver";
import { verifyToken } from "../../interfaceAdapters/middleware/auth.middleware";

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

    this.router.get(
      "/get-category",
      verifyToken,
      (req: Request, res: Response) => {
        categoryController.getCategories(req, res);
      },
    );

    this.router.post(
      "/add-category",
      verifyToken,
      (req: Request, res: Response) => {
        categoryController.addCategory(req, res);
      },
    );

    this.router
      .route("/edit-category")
      .put(verifyToken, (req: Request, res: Response) => {
        categoryController.editCategory(req, res);
      })
      .patch(verifyToken, (req: Request, res: Response) => {
        categoryController.updateCategoryStatus(req, res);
      });

    this.router.get(
      "/get-activities",
      verifyToken,
      (req: Request, res: Response) => {
        activityController.getAllActivities(req, res);
      },
    );

    this.router.patch(
      `/activity/status/:id`,
      verifyToken,
      (req: Request, res: Response) => {
        activityController.updateActivity(req, res);
      },
    );

    this.router.get(
      "/dashboard",
      verifyToken,
      (req: Request, res: Response) => {
        dashboardController.adminDashboardController(req, res);
      },
    );
  }
}
