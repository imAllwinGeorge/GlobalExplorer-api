import { Request, Response } from "express";
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

    this.router.get(
      "/blog/get-myblogs",
      verifyToken,
      (req: Request, res: Response) => {
        blogController.getMyBlogs(req, res);
      },
    );

    this.router.put(
      "/blog/edit-blog/:id",
      verifyToken,
      upload.any(),
      (req: Request, res: Response) => {
        blogController.editBlog(req, res);
      },
    );

    this.router.get(
      "/activity/get-details/:id",
      verifyToken,
      (req: Request, res: Response) => {
        activityController.getActivityDetails(req, res);
      },
    );

    this.router.post("/activity/booking", (req: Request, res: Response) => {
      bookingController.createRazorpayOrder(req, res);
    });

    this.router.post("/payment/verify", (req: Request, res: Response) => {
      bookingController.verifyPayment(req, res);
    });

    this.router.get(
      "/get-categories",
      verifyToken,
      (req: Request, res: Response) => {
        categoryController.getCategoryNames(req, res);
      },
    );

    this.router.get(
      "/activity/filter",
      verifyToken,
      (req: Request, res: Response) => {
        activityController.getFilteredActivity(req, res);
      },
    );

    this.router.get(
      "/get-bookings",
      verifyToken,
      (req: Request, res: Response) => {
        bookingController.getBookings(req, res);
      },
    );

    this.router.patch(
      "/cancel-booking",
      verifyToken,
      (req: Request, res: Response) => {
        bookingController.cancelBooking(req, res);
      },
    );

    this.router.delete(
      "/blog/delete-blog/:id",
      verifyToken,
      (req: Request, res: Response) => {
        blogController.deleteBlog(req, res);
      },
    );

    this.router.get(
      "/chat/get-conversation/:id",
      verifyToken,
      (req: Request, res: Response) => {
        chatController.getAllConversation(req, res);
      },
    );

    this.router.get(
      "/get-user/:search",
      // verifyToken,
      (req: Request, res: Response) => {
        chatController.userSearch(req, res);
      },
    );

    this.router.get(
      "/get-chat/:conversationId",
      // verifyToken,
      (req: Request, res: Response) => {
        chatController.getMessages(req, res);
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
      "/get-notification/:userId",
      // verifyToken,
      (req: Request, res: Response) => {
        notificationController.getNotifications(req, res);
      },
    );

    this.router.post(
      "/review/write-review",
      verifyToken,
      (req: Request, res: Response) => {
        reviewController.writeReview(req, res);
      },
    );
  }
}
