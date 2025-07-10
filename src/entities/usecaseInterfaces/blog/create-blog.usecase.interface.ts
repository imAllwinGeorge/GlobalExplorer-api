import { IBlogModel } from "frameworks/database/mongo/models/blog.model";
import { BlogDTO } from "shared/dtos/Auth.dto";

export interface ICreateBlogUsecaseInterface {
  execute(data: BlogDTO): Promise<IBlogModel>;
}
