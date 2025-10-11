import { verifyToken } from "../../interfaceAdapters/middleware/auth.middleware";
import {
  activityController,
  bookingController,
  categoryController,
  chatController,
  dashboardController,
  hostController,
} from "../di/resolver";
import upload from "../multer/multer";
import { BaseRoute } from "./base.route";
import { NextFunction, Request, Response } from "express";

export class HostRoute extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.post(
      "/update-profile/:id",
      verifyToken,
      upload.any(),
      (req: Request, res: Response, next: NextFunction) => {
        hostController.editProfile(req, res, next);
      },
    );

    this.router.get(
      "/get-activity/:id",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        hostController.getActivity(req, res, next);
      },
    );

    this.router.get(
      "/get-categories",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        console.log("vwoingiowegi");
        categoryController.getCategories(req, res, next);
      },
    );

    this.router.post(
      "/add-activity",
      verifyToken,
      upload.any(),
      (req: Request, res: Response, next: NextFunction) => {
        hostController.addActivity(req, res, next);
      },
    );

    this.router
      .route("/edit-activity/:id")
      .put(
        verifyToken,
        upload.any(),
        (req: Request, res: Response, next: NextFunction) => {
          console.log("hsgsgsdkgasdlfgdjfajfjaljfl");
          activityController.editActivity(req, res, next);
        },
      )
      .patch(verifyToken, (req: Request, res: Response, next: NextFunction) => {
        activityController.updateActivity(req, res, next);
      });

    this.router.get(
      "/get-bookings",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        bookingController.getActivityBookings(req, res, next);
      },
    );

    this.router.get(
      "/dashboard/:id",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        dashboardController.hostDashboardContrller(req, res, next);
      },
    );

    this.router.patch(
      "/mark-read-message/:conversationId/:userId",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        chatController.markReadMessage(req, res, next);
      },
    );

    this.router.get(
      "/chat/get-conversation/:id",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        chatController.getAllConversation(req, res, next);
      },
    );
  }
}
