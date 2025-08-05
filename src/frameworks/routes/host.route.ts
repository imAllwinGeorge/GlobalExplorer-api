import { verifyToken } from "interfaceAdapters/middleware/auth.middleware";
import { BaseRoute } from "./base.route";
import { Request, Response } from "express";
import {
  activityController,
  bookingController,
  categoryController,
  chatController,
  dashboardController,
  hostController,
} from "frameworks/di/resolver";
import upload from "frameworks/multer/multer";

export class HostRoute extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.post(
      "/update-profile/:id",
      verifyToken,
      upload.any(),
      (req: Request, res: Response) => {
        hostController.editProfile(req, res);
      },
    );

    this.router.get(
      "/get-activity/:id",
      verifyToken,
      (req: Request, res: Response) => {
        hostController.getActivity(req, res);
      },
    );

    this.router.get(
      "/get-categories",
      verifyToken,
      (req: Request, res: Response) => {
        console.log("vwoingiowegi");
        categoryController.getCategories(req, res);
      },
    );

    this.router.post(
      "/add-activity",
      verifyToken,
      upload.any(),
      (req: Request, res: Response) => {
        hostController.addActivity(req, res);
      },
    );

    this.router
      .route("/edit-activity/:id")
      .put(verifyToken, upload.any(), (req: Request, res: Response) => {
        console.log("hsgsgsdkgasdlfgdjfajfjaljfl");
        activityController.editActivity(req, res);
      })
      .patch(verifyToken, (req: Request, res: Response) => {
        activityController.updateActivity(req, res);
      });

    this.router.get(
      "/get-bookings",
      verifyToken,
      (req: Request, res: Response) => {
        bookingController.getActivityBookings(req, res);
      },
    );

    this.router.get(
      "/dashboard/:id",
      verifyToken,
      (req: Request, res: Response) => {
        dashboardController.hostDashboardContrller(req, res);
      },
    );

    this.router.patch(
      "/mark-read-message/:conversationId/:userId",
      verifyToken,
      (req: Request, res: Response) => {
        chatController.markReadMessage(req, res);
      },
    );

    this.router.get(
      "/chat/get-conversation/:id",
      verifyToken,
      (req: Request, res: Response) => {
        chatController.getAllConversation(req, res);
      },
    );
  }
}
