import { NextFunction, Request, Response, Router } from "express";
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
    this.router.post(
      "/login",
      (req: Request, res: Response, next: NextFunction) => {
        authController.login(req, res, next);
      },
    );

    this.router.get(
      "/get-users/:role",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        userController.getAllUsers(req, res, next);
      },
    );

    this.router.post(
      "/update-status/:role",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        userController.updateStatus(req, res, next);
      },
    );

    this.router.get(
      "/get-user",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        userController.getUser(req, res, next);
      },
    );

    this.router.get(
      "/get-category",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        categoryController.getCategories(req, res, next);
      },
    );

    this.router.post(
      "/add-category",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        categoryController.addCategory(req, res, next);
      },
    );

    this.router
      .route("/edit-category")
      .put(verifyToken, (req: Request, res: Response, next: NextFunction) => {
        categoryController.editCategory(req, res, next);
      })
      .patch(verifyToken, (req: Request, res: Response, next: NextFunction) => {
        categoryController.updateCategoryStatus(req, res, next);
      });

    this.router.get(
      "/get-activities",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        activityController.getAllActivities(req, res, next);
      },
    );

    this.router.patch(
      `/activity/status/:id`,
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        activityController.updateActivity(req, res, next);
      },
    );

    this.router.get(
      "/dashboard",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        dashboardController.adminDashboardController(req, res, next);
      },
    );
  }
}
