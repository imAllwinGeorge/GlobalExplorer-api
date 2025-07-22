import { IBlogModel } from "frameworks/database/mongo/models/blog.model";
import { BlogDTO } from "shared/dtos/Auth.dto";

export interface ICreateBlogUsecase {
  execute(data: BlogDTO): Promise<IBlogModel>;
}
