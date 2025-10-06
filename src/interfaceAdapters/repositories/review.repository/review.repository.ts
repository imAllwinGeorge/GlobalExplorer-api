import { IReviewRepository } from "../../../entities/repositoryInterfaces/review/review-repository.interface";
import {
  IReviewModel,
  ReviewModel,
} from "../../../frameworks/database/mongo/models/review.model";
import { ReviewResponseDTO } from "../../../shared/dtos/response.dto";
import { BaseRepository } from "../base.repository";

export class ReviewRepository
  extends BaseRepository<IReviewModel>
  implements IReviewRepository
{
  constructor() {
    super(ReviewModel);
  }

  async getReviewWithUserNames(entityId: string): Promise<ReviewResponseDTO[]> {
    return await this.model
      .find({ entityId })
      .populate({
        path: "userId",
        select: "firstName lastName", // Only fetch these fields
      })
      .lean();
  }
}
