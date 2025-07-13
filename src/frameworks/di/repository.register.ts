import { container } from "tsyringe";
import { UserRepository } from "../../interfaceAdapters/repositories/users/user.repository";
import { IUserRepositoryInterface } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IAdminRepositoryInterface } from "../../entities/repositoryInterfaces/users/admin-repository.inteface";
import { AdminRepository } from "../../interfaceAdapters/repositories/users/admin.repository";
import { IHostRepositoryInterface } from "entities/repositoryInterfaces/users/host-repository.interface";
import { HostRepository } from "interfaceAdapters/repositories/users/host.repository";
import { ICategoryRepositoryInterface } from "entities/repositoryInterfaces/category/categoryRepository.interface";
import { CategoryRepository } from "interfaceAdapters/repositories/category.repository/category.repository";
import { IActivityRepositoryInterface } from "entities/repositoryInterfaces/activity/activityRepository.interface";
import { ActivityRepository } from "interfaceAdapters/repositories/activity.Repository/activity.repository";
import { IBlogRepositoryInterface } from "entities/repositoryInterfaces/Blog/blog-repository.interface";
import { BlogRepository } from "interfaceAdapters/repositories/blog.repository/blog.repositor";
import { IRefreshTokenRepositoryInterface } from "entities/repositoryInterfaces/refreshToken/refresh-token.repository.interface";
import { RefreshTokenRepository } from "interfaceAdapters/repositories/refresh-token.repository/refresh-token.repository";
import { IBookingRepositoryInterface } from "entities/repositoryInterfaces/booking/booking-repository.interface";
import { BookingRepository } from "interfaceAdapters/repositories/Booking-repository";

export class RepositoryRegistry {
  static registerRepositories(): void {
    container.register<IUserRepositoryInterface>("IUserRepository", {
      useClass: UserRepository,
    });

    container.register<IAdminRepositoryInterface>("IAdminRepository", {
      useClass: AdminRepository,
    });

    container.register<IHostRepositoryInterface>("IHostRepository", {
      useClass: HostRepository,
    });

    container.register<ICategoryRepositoryInterface>("ICategoryRepository", {
      useClass: CategoryRepository,
    });

    container.register<IActivityRepositoryInterface>("IActivityRepository", {
      useClass: ActivityRepository,
    });

    container.register<IBlogRepositoryInterface>("IBlogRepository", {
      useClass: BlogRepository,
    });

    container.register<IRefreshTokenRepositoryInterface>(
      "IRefreshTokenRepository",
      {
        useClass: RefreshTokenRepository,
      },
    );

    container.register<IBookingRepositoryInterface>("IBookingRepository", {
      useClass: BookingRepository,
    });
  }
}
