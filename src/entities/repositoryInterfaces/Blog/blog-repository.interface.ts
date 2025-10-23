import { IBlogModel } from "../../../frameworks/database/mongo/models/blog.model";
import { ImageGallery } from "../../../shared/types/types";
import { IBaseRepository } from "../IBaseRepository.interface";

// export type IBlogRepository = IBaseRepository<IBlogModel>;

export interface IBlogRepository extends IBaseRepository<IBlogModel> {
  galleryImages(): Promise<ImageGallery[]>;
}
