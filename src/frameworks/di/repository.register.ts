import { container } from "tsyringe";
import { UserRepository } from "../../interfaceAdapters/repositories/users/user.repository";
import { IUserRepositoryInterface } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IAdminRepositoryInterface } from "../../entities/repositoryInterfaces/users/admin-repository.inteface";
import { AdminRepository } from "../../interfaceAdapters/repositories/users/admin.repository";
import { IHostRepositoryInterface } from "entities/repositoryInterfaces/users/host-repository.interface";
import { HostRepository } from "interfaceAdapters/repositories/users/host.repository";
import { ICategoryRepositoryInterface } from "entities/repositoryInterfaces/category/categoryRepository.interface";
import { CategoryRepository } from "interfaceAdapters/repositories/category.repository/category.repository";

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
  }
}
