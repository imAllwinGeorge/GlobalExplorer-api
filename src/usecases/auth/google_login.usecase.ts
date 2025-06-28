import { inject, injectable } from "tsyringe";
import { IGoogleLoginUsecaseInterface } from "../../entities/usecaseInterfaces/auth/google_login.usecase.interface";
import { IUserModel } from "../../frameworks/database/mongo/models/user.model";
import { GoogleUserDTO } from "../../shared/dtos/Auth.dto";
import { IUserRepositoryInterface } from "../../entities/repositoryInterfaces/users/user-repository.interface";

@injectable()
export class GoogleLoginUsecase implements IGoogleLoginUsecaseInterface {
  constructor(
    @inject("IUserRepository")
    private _repository: IUserRepositoryInterface,
  ) {}

  async execute(
    user: GoogleUserDTO,
    role: string,
  ): Promise<IUserModel | undefined> {
    let repository;
    if (role === "user") {
      repository = this._repository;
    }

    const newUser = await repository?.findOne({ email: user.email });

    if (newUser) {
      return newUser;
    }
    if (role === "user") {
      user.role = role;
      const savedUser = await repository?.save(user);
      return savedUser;
    }
  }
}
