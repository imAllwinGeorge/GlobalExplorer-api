import { container } from "tsyringe";
import { DependancyInjection } from "./container";
import { IAuthController } from "../../entities/controllerInterfaces/users/auth-controller.interface";
import { AuthController } from "../../interfaceAdapters/controllers/auth/auth.controller";
import { IUserControllerInterface } from "../../entities/controllerInterfaces/users/user-controller.interface";
import { IUserController } from "../../interfaceAdapters/controllers/user/user.controller";
import { ICategoryController } from "interfaceAdapters/controllers/category.controller";
import { ICategoryControllerInterface } from "entities/controllerInterfaces/category-controller.interface";
import { IActivityControllerInterface } from "entities/controllerInterfaces/activity-controller.interface";
import { ActivityController } from "interfaceAdapters/controllers/activity.controller";
import { IHostControllerInterface } from "entities/controllerInterfaces/users/host-controller.interface";
import { HostController } from "interfaceAdapters/controllers/user/host.controller";
import { IBlogControllerInterface } from "entities/controllerInterfaces/blog-controller.interface";
import { BlogController } from "interfaceAdapters/controllers/blog.controller";

DependancyInjection.registerAll();

export const authController =
  container.resolve<IAuthController>(AuthController);

export const userController =
  container.resolve<IUserControllerInterface>(IUserController);

export const categoryController =
  container.resolve<ICategoryControllerInterface>(ICategoryController);

export const activityController =
  container.resolve<IActivityControllerInterface>(ActivityController);

export const hostController =
  container.resolve<IHostControllerInterface>(HostController);

export const blogController =
  container.resolve<IBlogControllerInterface>(BlogController);
