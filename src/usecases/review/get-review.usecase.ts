import { inject, injectable } from "tsyringe";
import { IGetReviewUsecase } from "../../entities/usecaseInterfaces/review/get-review.interface";
import { IReviewRepository } from "../../entities/repositoryInterfaces/review/review-repository.interface";
import { ReviewMapper } from "../../shared/mappers/review.mapper";
import { ReviewResponseDTO } from "../../shared/dtos/response.dto";

@injectable()
export class GetReviewUsecase implements IGetReviewUsecase {
  constructor(
    @inject("IReviewRepository")
    private _reviewRepository: IReviewRepository,

    @inject(ReviewMapper)
    private _reviewMapper: ReviewMapper,
  ) {}

  async execute(id: string): Promise<ReviewResponseDTO[]> {
    const reviews = await this._reviewRepository.getReviewWithUserNames(id);

    return reviews;
  }
}
