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
