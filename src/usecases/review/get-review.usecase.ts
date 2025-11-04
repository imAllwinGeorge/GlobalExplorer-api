import { inject, injectable } from "tsyringe";
import { IGetReviewUsecase } from "../../entities/usecaseInterfaces/review/get-review.interface";
import { IReviewRepository } from "../../entities/repositoryInterfaces/review/review-repository.interface";
import { ReviewResponseDTO } from "../../shared/dtos/response.dto";
import { IReviewMapper } from "../../entities/mapperInterfaces/review-mapper.interface";

@injectable()
export class GetReviewUsecase implements IGetReviewUsecase {
  constructor(
    @inject("IReviewRepository")
    private _reviewRepository: IReviewRepository,

    @inject("IReviewMapper")
    private _reviewMapper: IReviewMapper,
  ) {}

  async execute(id: string): Promise<ReviewResponseDTO[]> {
    const reviews = await this._reviewRepository.getReviewWithUserNames(id);

    return reviews;
  }
}
