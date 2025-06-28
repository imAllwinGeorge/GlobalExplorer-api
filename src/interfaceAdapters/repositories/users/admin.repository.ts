import { injectable } from "tsyringe";
import { IAdminRepositoryInterface } from "../../../entities/repositoryInterfaces/users/admin-repository.inteface";
import { BaseRepository } from "../base.repository";
import {
  AdminModel,
  IAdminModel,
} from "../../../frameworks/database/mongo/models/admin.model";

@injectable()
export class AdminRepository
  extends BaseRepository<IAdminModel>
  implements IAdminRepositoryInterface
{
  constructor() {
    super(AdminModel);
  }
}
