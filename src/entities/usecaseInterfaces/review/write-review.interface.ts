import { IReviewModel } from "frameworks/database/mongo/models/review.model";
import { ReviewDTO } from "shared/dtos/Auth.dto";

export interface IWriteReviewUsecase {
  execute(review: ReviewDTO): Promise<IReviewModel>;
}
