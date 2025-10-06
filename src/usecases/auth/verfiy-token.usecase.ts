import { inject, injectable } from "tsyringe";
import { IVerifyTokenUsecase } from "../../entities/usecaseInterfaces/auth/verify-token.usecase.interface";
import { IJwtservice } from "../../entities/serviceInterfaces/jwt-services.interface";
import { IUserRepository } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IAdminRepository } from "../../entities/repositoryInterfaces/users/admin-repository.inteface";
import { IUserModel } from "../../frameworks/database/mongo/models/user.model";
import { IAdminModel } from "../../frameworks/database/mongo/models/admin.model";
import { IHostRepository } from "../../entities/repositoryInterfaces/users/host-repository.interface";
import { IHostModel } from "../../frameworks/database/mongo/models/host.model";
import { ROLE } from "../../shared/constants/constants";

@injectable()
export class VerifyTokenUsecase implements IVerifyTokenUsecase {
  constructor(
    @inject("IJwtService")
    private _tokenService: IJwtservice,

    @inject("IUserRepository")
    private _UserRepository: IUserRepository,

    @inject("IAdminRepository")
    private _adminRepository: IAdminRepository,

    @inject("IHostRepository")
    private _hostRepository: IHostRepository,
  ) {}
  async execute(
    token: string,
    role: string,
  ): Promise<IAdminModel | IHostModel | IUserModel> {
    const decode = this._tokenService.verifyToken(token);

    let repository;

    if (role === ROLE.USER) {
      repository = this._UserRepository;
    } else if (role === ROLE.ADMIN) {
      repository = this._adminRepository;
    } else if (role === ROLE.HOST) {
      repository = this._adminRepository;
    } else {
      throw new Error("session Expired");
    }
    let user: IUserModel | IAdminModel | null;

    user = await repository.findOne({ email: decode.email });

    if (!user) {
      throw new Error("authentication Error");
    }

    return user;
  }
}
