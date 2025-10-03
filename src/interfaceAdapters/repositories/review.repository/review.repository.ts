import {
  IReviewModel,
  ReviewModel,
} from "frameworks/database/mongo/models/review.model";
import { BaseRepository } from "../base.repository";
import { IReviewRepository } from "entities/repositoryInterfaces/review/review-repository.interface";

export class ReviewRepository
  extends BaseRepository<IReviewModel>
  implements IReviewRepository
{
  constructor() {
    super(ReviewModel);
  }
}
