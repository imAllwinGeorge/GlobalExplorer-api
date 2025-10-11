import { inject, injectable } from "tsyringe";
import { IWriteReviewUsecase } from "../../entities/usecaseInterfaces/review/write-review.interface";
import { IReviewRepository } from "../../entities/repositoryInterfaces/review/review-repository.interface";
import { IReviewModel } from "../../frameworks/database/mongo/models/review.model";
import { ReviewDTO } from "../../shared/dtos/Auth.dto";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";

@injectable()
export class WriteReviewUsecase implements IWriteReviewUsecase {
  constructor(
    @inject("IReviewRepository")
    private _reviewRepository: IReviewRepository,
  ) {}

  async execute(review: ReviewDTO): Promise<IReviewModel> {
    const response = await this._reviewRepository.save(review);

    if (!response)
      throw new AppError(
        "failed to save the review.",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );

    return response;
  }
}
