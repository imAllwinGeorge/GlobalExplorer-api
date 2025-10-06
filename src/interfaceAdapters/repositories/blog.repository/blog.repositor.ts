import { injectable } from "tsyringe";
import { BaseRepository } from "../base.repository";
import {
  BlogModel,
  IBlogModel,
} from "../../../frameworks/database/mongo/models/blog.model";
import { IBlogRepository } from "../../../entities/repositoryInterfaces/Blog/blog-repository.interface";

@injectable()
export class BlogRepository
  extends BaseRepository<IBlogModel>
  implements IBlogRepository
{
  constructor() {
    super(BlogModel);
  }
}
