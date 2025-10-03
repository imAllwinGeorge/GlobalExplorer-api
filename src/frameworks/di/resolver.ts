import { container } from "tsyringe";
import { DependancyInjection } from "./container";
import { IAuthController } from "../../entities/controllerInterfaces/users/auth-controller.interface";
import { AuthController } from "../../interfaceAdapters/controllers/auth/auth.controller";
import { IUserController } from "../../entities/controllerInterfaces/users/user-controller.interface";
import { UserController } from "../../interfaceAdapters/controllers/user/user.controller";
import { CategoryController } from "interfaceAdapters/controllers/category.controller";
import { ICategoryController } from "entities/controllerInterfaces/category-controller.interface";
import { IActivityController } from "entities/controllerInterfaces/activity-controller.interface";
import { ActivityController } from "interfaceAdapters/controllers/activity.controller";
import { IHostController } from "entities/controllerInterfaces/users/host-controller.interface";
import { HostController } from "interfaceAdapters/controllers/user/host.controller";
import { IBlogController } from "entities/controllerInterfaces/blog-controller.interface";
import { BlogController } from "interfaceAdapters/controllers/blog.controller";
import { IBookingController } from "entities/controllerInterfaces/Booking-controller.interface";
import { BookingController } from "interfaceAdapters/controllers/booking.controller";
import { IDirectChatHandler } from "entities/socketHandlersInterfaces/IDirect-chat.handler.interface";
import { DirectChatHandler } from "interfaceAdapters/socket/handlers/direct-chat.handler";
import { IChatController } from "entities/controllerInterfaces/chat-controller.interface";
import { ChatController } from "interfaceAdapters/controllers/chat.controller";
import { INotificationController } from "entities/controllerInterfaces/notification-controller.interface";
import { NotificationController } from "interfaceAdapters/controllers/notification.controller";
import { INotificationHandler } from "entities/socketHandlersInterfaces/INotification.handler.interface";
import { NotifcationHandler } from "interfaceAdapters/socket/handlers/notification.handler";
import { IDashboardController } from "entities/controllerInterfaces/dashboard-controller.interface";
import { DashBoardController } from "interfaceAdapters/controllers/dashboard.controller";
import { IReviewController } from "entities/controllerInterfaces/review-controller.interface";
import { ReviewController } from "interfaceAdapters/controllers/review.controller";
import { ISignallingHandler } from "entities/socketHandlersInterfaces/ISignalling.handler.interface";
import { SignallingHandler } from "interfaceAdapters/socket/handlers/Singnalling.handler";

DependancyInjection.registerAll();

export const authController =
  container.resolve<IAuthController>(AuthController);

export const userController =
  container.resolve<IUserController>(UserController);

export const categoryController =
  container.resolve<ICategoryController>(CategoryController);

export const activityController =
  container.resolve<IActivityController>(ActivityController);

export const hostController =
  container.resolve<IHostController>(HostController);

export const blogController =
  container.resolve<IBlogController>(BlogController);

export const bookingController =
  container.resolve<IBookingController>(BookingController);

export const chatController =
  container.resolve<IChatController>(ChatController);

export const notificationController =
  container.resolve<INotificationController>(NotificationController);

export const directChantHandler =
  container.resolve<IDirectChatHandler>(DirectChatHandler);

export const notificationHandler =
  container.resolve<INotificationHandler>(NotifcationHandler);

export const signallingHandler =
  container.resolve<ISignallingHandler>(SignallingHandler);

export const dashboardController =
  container.resolve<IDashboardController>(DashBoardController);

export const reviewController =
  container.resolve<IReviewController>(ReviewController);
