import { IBlogRepositoryInterface } from "entities/repositoryInterfaces/Blog/blog-repository.interface";
import {
  BlogModel,
  IBlogModel,
} from "frameworks/database/mongo/models/blog.model";
import { injectable } from "tsyringe";
import { BaseRepository } from "../base.repository";

@injectable()
export class BlogRepository
  extends BaseRepository<IBlogModel>
  implements IBlogRepositoryInterface
{
  constructor() {
    super(BlogModel);
  }
}
