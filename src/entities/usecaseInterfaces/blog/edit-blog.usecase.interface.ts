import { IBlogModel } from "frameworks/database/mongo/models/blog.model";

export interface IEditBlogUsecaseInterface {
  execute(data: IBlogModel): Promise<IBlogModel>;
}
