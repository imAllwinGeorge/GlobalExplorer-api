import { IReviewModel } from "../../../frameworks/database/mongo/models/review.model";
import { ReviewResponseDTO } from "../../../shared/dtos/response.dto";
import { IBaseRepository } from "../IBaseRepository.interface";

export interface IReviewRepository extends IBaseRepository<IReviewModel> {
  getReviewWithUserNames(id: string): Promise<ReviewResponseDTO[]>;
}
