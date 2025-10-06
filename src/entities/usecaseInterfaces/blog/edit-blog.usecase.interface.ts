import { IBlogModel } from "../../../frameworks/database/mongo/models/blog.model";
import { BlogResponseDTO } from "../../../shared/dtos/response.dto";

export interface IEditBlogUsecase {
  execute(data: IBlogModel): Promise<BlogResponseDTO>;
}
