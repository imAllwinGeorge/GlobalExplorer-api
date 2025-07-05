import { container } from "tsyringe";
import { DependancyInjection } from "./container";
import { IAuthController } from "../../entities/controllerInterfaces/users/auth-controller.interface";
import { AuthController } from "../../interfaceAdapters/controllers/auth/auth.controller";
import { IUserControllerInterface } from "../../entities/controllerInterfaces/users/user-controller.interface";
import { IUserController } from "../../interfaceAdapters/controllers/user/user.controller";
import { ICategoryController } from "interfaceAdapters/controllers/category.controller";

DependancyInjection.registerAll();

export const authController =
  container.resolve<IAuthController>(AuthController);

export const userController =
  container.resolve<IUserControllerInterface>(IUserController);

export const categoryController =
  container.resolve<ICategoryController>(ICategoryController);
