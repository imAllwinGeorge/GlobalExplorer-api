import { Request, Response } from "express";
import {
  activityController,
  authController,
  blogController,
  userController,
} from "../di/resolver";
import { verifyToken } from "interfaceAdapters/middleware/auth.middleware";
import { BaseRoute } from "./base.route";
import upload from "frameworks/multer/multer";

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

    this.router.get(
      "/get-activities",
      verifyToken,
      (req: Request, res: Response) => {
        activityController.getAllActivities(req, res);
      },
    );

    this.router.post(
      "/blog/create-blog",
      verifyToken,
      upload.any(),
      (req: Request, res: Response) => {
        blogController.createBlog(req, res);
      },
    );

    this.router.get(
      "/blog/get-blogs",
      verifyToken,
      (req: Request, res: Response) => {
        blogController.getBlogs(req, res);
      },
    );
  }
}
