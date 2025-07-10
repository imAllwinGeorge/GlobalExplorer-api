import { IBaseRepositoryInterface } from "../IBaseRepository.interface";
import { IActivityModel } from "frameworks/database/mongo/models/activity.model";

export type IActivityRepositoryInterface =
  IBaseRepositoryInterface<IActivityModel>;
