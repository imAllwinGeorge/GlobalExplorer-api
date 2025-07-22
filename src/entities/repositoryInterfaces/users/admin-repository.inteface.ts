import { IAdminModel } from "../../../frameworks/database/mongo/models/admin.model";
import { IBaseRepository } from "../IBaseRepository.interface";

export type IAdminRepository = IBaseRepository<IAdminModel>;
