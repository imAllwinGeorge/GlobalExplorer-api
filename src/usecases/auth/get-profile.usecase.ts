import { IAdminRepository } from "entities/repositoryInterfaces/users/admin-repository.inteface";
import { IHostRepository } from "entities/repositoryInterfaces/users/host-repository.interface";
import { IUserRepository } from "entities/repositoryInterfaces/users/user-repository.interface";
import { IGetProfileUsecase } from "entities/usecaseInterfaces/auth/get-profile.usecase.interface";
import { IAdminModel } from "frameworks/database/mongo/models/admin.model";
import { IHostModel } from "frameworks/database/mongo/models/host.model";
import { IUserModel } from "frameworks/database/mongo/models/user.model";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetProfileUsecase implements IGetProfileUsecase {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepository,

    @inject("IHostRepository")
    private _hostRepository: IHostRepository,

    @inject("IAdminRepository")
    private _adminRepository: IAdminRepository,
  ) {}

  async execute(
    id: string,
    role: string,
  ): Promise<IUserModel | IHostModel | IAdminModel> {
    let repository;
    if (role === "user") {
      repository = this._userRepository;
    } else if (role === "host") {
      repository = this._hostRepository;
    } else if (role === "admin") {
      repository = this._adminRepository;
    } else {
      throw new Error("Invalid role");
    }

    const profile = await repository.findOne({ _id: id });
    if (!profile) throw new Error("Profile not found!");
    return profile;
  }
}
