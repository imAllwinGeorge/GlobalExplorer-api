import { inject, injectable } from "tsyringe";
import { IWriteReviewUsecase } from "../../entities/usecaseInterfaces/review/write-review.interface";
import { IReviewRepository } from "../../entities/repositoryInterfaces/review/review-repository.interface";
import { IReviewModel } from "../../frameworks/database/mongo/models/review.model";
import { ReviewDTO } from "../../shared/dtos/Auth.dto";

@injectable()
export class WriteReviewUsecase implements IWriteReviewUsecase {
  constructor(
    @inject("IReviewRepository")
    private _reviewRepository: IReviewRepository,
  ) {}

  async execute(review: ReviewDTO): Promise<IReviewModel> {
    const response = await this._reviewRepository.save(review);

    if (!response) throw new Error("failed to save the review.");

    return response;
  }
}
