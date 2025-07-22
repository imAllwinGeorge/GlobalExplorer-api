import { IBlogModel } from "frameworks/database/mongo/models/blog.model";
import { IBaseRepository } from "../IBaseRepository.interface";

export type IBlogRepository = IBaseRepository<IBlogModel>;
