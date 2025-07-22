import { IBlogModel } from "frameworks/database/mongo/models/blog.model";

export interface IEditBlogUsecase {
  execute(data: IBlogModel): Promise<IBlogModel>;
}
