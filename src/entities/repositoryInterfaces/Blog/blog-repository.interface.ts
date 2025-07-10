import { IBlogModel } from "frameworks/database/mongo/models/blog.model";
import { IBaseRepositoryInterface } from "../IBaseRepository.interface";

export type IBlogRepositoryInterface = IBaseRepositoryInterface<IBlogModel>;
