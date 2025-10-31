import { inject, injectable } from "tsyringe";
import { IBlogRepository } from "../../entities/repositoryInterfaces/Blog/blog-repository.interface";
import { IActivityRepository } from "../../entities/repositoryInterfaces/activity/activityRepository.interface";
import { IUserHomeUsecase } from "../../entities/usecaseInterfaces/dashboard/user-home.interface";
import { ImageGallery } from "../../shared/types/types";
import { ActivityMapper } from "../../shared/mappers/activity.mapper";
import { IActivityModel } from "../../frameworks/database/mongo/models/activity.model";
import { ActivityResponseDTO } from "../../shared/dtos/response.dto";

@injectable()
export class UserHomeUsecase implements IUserHomeUsecase {
  constructor(
    @inject("IBlogRepository")
    private _blogRepository: IBlogRepository,

    @inject("IActivityRepository")
    private _activityRepository: IActivityRepository,

    @inject(ActivityMapper)
    private activityMapper: ActivityMapper,
  ) {}

  async execute(
    limit: number,
    skip: number,
  ): Promise<{
    images: ImageGallery[];
    activities: ActivityResponseDTO[];
    totalPages: number;
  }> {
    const [blogImages, activityImages, activities] = await Promise.all([
      this._blogRepository.galleryImages(),
      this._activityRepository.galleryImages(),
      this._activityRepository.findAll(limit, skip, {}),
    ]);

    const blogs = blogImages.map((item) => ({
      ...item,
      url: `/blog/read/${item._id}`,
    }));

    const activitiesImages = activityImages.map((item) => ({
      ...item,
      url: `/activity-details/${item._id}`,
    }));

    return {
      images: [...blogs, ...activitiesImages].sort(() => 0),
      activities: this.activityMapper.toDTOs(
        activities.items as IActivityModel[],
      ),
      totalPages: activities.total,
    };
  }
}
