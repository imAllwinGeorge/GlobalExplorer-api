import { NextFunction, Request, Response } from "express";
import {
  activityController,
  authController,
  blogController,
  bookingController,
  categoryController,
  chatController,
  notificationController,
  reviewController,
  userController,
} from "../di/resolver";
import { BaseRoute } from "./base.route";
import { verifyToken } from "../../interfaceAdapters/middleware/auth.middleware";
import upload from "../multer/multer";

export class UserRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
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
      "/get-activities",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        activityController.getAllActivities(req, res, next);
      },
    );

    this.router.post(
      "/blog/create-blog",
      verifyToken,
      upload.any(),
      (req: Request, res: Response, next: NextFunction) => {
        blogController.createBlog(req, res, next);
      },
    );

    this.router.get(
      "/blog/get-blogs",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        blogController.getBlogs(req, res, next);
      },
    );

    this.router.get(
      "/blog/get-myblogs",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        blogController.getMyBlogs(req, res, next);
      },
    );

    this.router.put(
      "/blog/edit-blog/:id",
      verifyToken,
      upload.any(),
      (req: Request, res: Response, next: NextFunction) => {
        blogController.editBlog(req, res, next);
      },
    );

    this.router.get(
      "/activity/get-details/:id",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        activityController.getActivityDetails(req, res, next);
      },
    );

    this.router.post(
      "/activity/booking",
      (req: Request, res: Response, next: NextFunction) => {
        bookingController.createRazorpayOrder(req, res, next);
      },
    );

    this.router.post(
      "/payment/verify",
      (req: Request, res: Response, next: NextFunction) => {
        bookingController.verifyPayment(req, res, next);
      },
    );

    this.router.get(
      "/get-categories",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        categoryController.getCategoryNames(req, res, next);
      },
    );

    this.router.get(
      "/activity/filter",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        activityController.getFilteredActivity(req, res, next);
      },
    );

    this.router.get(
      "/activity/order/:orderId",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        bookingController.getBooking(req, res, next);
      },
    );

    this.router.get(
      "/get-bookings",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        bookingController.getBookings(req, res, next);
      },
    );

    this.router.patch(
      "/cancel-booking",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        bookingController.cancelBooking(req, res, next);
      },
    );

    this.router.delete(
      "/blog/delete-blog/:id",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        blogController.deleteBlog(req, res, next);
      },
    );

    this.router.get(
      "/chat/get-conversation/:id",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        chatController.getAllConversation(req, res, next);
      },
    );

    this.router.get(
      "/get-user/:search",
      // verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        chatController.userSearch(req, res, next);
      },
    );

    this.router.get(
      "/get-chat/:conversationId",
      // verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        chatController.getMessages(req, res, next);
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
      "/get-notification/:userId",
      // verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        notificationController.getNotifications(req, res, next);
      },
    );

    this.router.post(
      "/review/write-review",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        reviewController.writeReview(req, res, next);
      },
    );
  }
}
