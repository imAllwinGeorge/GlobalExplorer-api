import { RepositoryRegistry } from "./repository.register";
import { UsecaseRegistery } from "./usecase.register";

export class DependancyInjection {
  static registerAll(): void {
    RepositoryRegistry.registerRepositories();
    UsecaseRegistery.registerUsecases();
  }
}
