import { container } from "tsyringe";
import { UserRepository } from "../../interfaceAdapters/repositories/users/user.repository";
import { IUserRepository } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IAdminRepository } from "../../entities/repositoryInterfaces/users/admin-repository.inteface";
import { AdminRepository } from "../../interfaceAdapters/repositories/users/admin.repository";
import { IHostRepository } from "entities/repositoryInterfaces/users/host-repository.interface";
import { HostRepository } from "interfaceAdapters/repositories/users/host.repository";
import { ICategoryRepository } from "entities/repositoryInterfaces/category/categoryRepository.interface";
import { CategoryRepository } from "interfaceAdapters/repositories/category.repository/category.repository";
import { IActivityRepository } from "entities/repositoryInterfaces/activity/activityRepository.interface";
import { ActivityRepository } from "interfaceAdapters/repositories/activity.Repository/activity.repository";
import { IBlogRepository } from "entities/repositoryInterfaces/Blog/blog-repository.interface";
import { BlogRepository } from "interfaceAdapters/repositories/blog.repository/blog.repositor";
import { IRefreshTokenRepository } from "entities/repositoryInterfaces/refreshToken/refresh-token.repository.interface";
import { RefreshTokenRepository } from "interfaceAdapters/repositories/refresh-token.repository/refresh-token.repository";
import { IBookingRepository } from "entities/repositoryInterfaces/booking/booking-repository.interface";
import { BookingRepository } from "interfaceAdapters/repositories/Booking-repository";
import { IMessageRepository } from "entities/repositoryInterfaces/chat/IMessage.repository.interface";
import { MessageRepository } from "interfaceAdapters/repositories/chat.Repository/message.repository";
import { IConversationRepository } from "entities/repositoryInterfaces/chat/Conversation.repository.interface";
import { ConversationRepository } from "interfaceAdapters/repositories/chat.Repository/conversation.repository";
import { ISocketUserMapRepository } from "entities/repositoryInterfaces/redis/socket-user.repository";
import { RedisSocketUserRepository } from "interfaceAdapters/redis/socket-user.repository";
import { INotificationRepository } from "entities/repositoryInterfaces/notification/notificationRepository";
import { NotificationRepository } from "interfaceAdapters/repositories/notifiation.repository/notification.repository";
import { IReviewRepository } from "entities/repositoryInterfaces/review/review-repository.interface";
import { ReviewRepository } from "interfaceAdapters/repositories/review.repository/review.repository";

export class RepositoryRegistry {
  static registerRepositories(): void {
    container.register<IUserRepository>("IUserRepository", {
      useClass: UserRepository,
    });

    container.register<IAdminRepository>("IAdminRepository", {
      useClass: AdminRepository,
    });

    container.register<IHostRepository>("IHostRepository", {
      useClass: HostRepository,
    });

    container.register<ICategoryRepository>("ICategoryRepository", {
      useClass: CategoryRepository,
    });

    container.register<IActivityRepository>("IActivityRepository", {
      useClass: ActivityRepository,
    });

    container.register<IBlogRepository>("IBlogRepository", {
      useClass: BlogRepository,
    });

    container.register<IRefreshTokenRepository>("IRefreshTokenRepository", {
      useClass: RefreshTokenRepository,
    });

    container.register<IBookingRepository>("IBookingRepository", {
      useClass: BookingRepository,
    });

    container.register<IMessageRepository>("IMessageRepository", {
      useClass: MessageRepository,
    });

    container.register<IConversationRepository>("IConversationRepository", {
      useClass: ConversationRepository,
    });

    container.register<ISocketUserMapRepository>("ISocketUserRepository", {
      useClass: RedisSocketUserRepository,
    });

    container.register<INotificationRepository>("INotificationRepository", {
      useClass: NotificationRepository,
    });

    container.register<IReviewRepository>("IReviewRepository", {
      useClass: ReviewRepository,
    });
  }
}
