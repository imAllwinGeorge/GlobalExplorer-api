import { IAdminModel } from "../../../frameworks/database/mongo/models/admin.model";
import { IBaseRepositoryInterface } from "../IBaseRepository.interface";

export type IAdminRepositoryInterface = IBaseRepositoryInterface<IAdminModel>;
