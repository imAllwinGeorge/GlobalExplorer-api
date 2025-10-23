import { inject, injectable } from "tsyringe";
import { IBlogRepository } from "../../entities/repositoryInterfaces/Blog/blog-repository.interface";
import { IActivityRepository } from "../../entities/repositoryInterfaces/activity/activityRepository.interface";
import { IGalleryUsecase } from "../../entities/usecaseInterfaces/dashboard/Image-gallery.interface";
import { ImageGallery } from "../../shared/types/types";

@injectable()
export class GalleryUsecase implements IGalleryUsecase {
  constructor(
    @inject("IBlogRepository")
    private _blogRepository: IBlogRepository,

    @inject("IActivityRepository")
    private _activityRepository: IActivityRepository,
  ) {}

  async execute(): Promise<ImageGallery[]> {
    const [blogImages, activityImages] = await Promise.all([
      this._blogRepository.galleryImages(),
      this._activityRepository.galleryImages(),
    ]);

    const blogs = blogImages.map((item) => ({
      ...item,
      url: `/blog/read/${item._id}`,
    }));

    const activities = activityImages.map((item) => ({
      ...item,
      url: `/activity-details/${item._id}`,
    }));

    return [...blogs, ...activities].sort(() => 0);
  }
}
