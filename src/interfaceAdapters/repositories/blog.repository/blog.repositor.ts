import { injectable } from "tsyringe";
import { BaseRepository } from "../base.repository";
import {
  BlogModel,
  IBlogModel,
} from "../../../frameworks/database/mongo/models/blog.model";
import { IBlogRepository } from "../../../entities/repositoryInterfaces/Blog/blog-repository.interface";
import { ImageGallery } from "../../../shared/types/types";

@injectable()
export class BlogRepository
  extends BaseRepository<IBlogModel>
  implements IBlogRepository
{
  constructor() {
    super(BlogModel);
  }

  async galleryImages(): Promise<ImageGallery[]> {
    return await this.model
      .find({}, { _id: 1, image: 1, title: 1 })
      .limit(6)
      .lean();
  }
}
