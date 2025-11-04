import { IReviewModel } from "../../frameworks/database/mongo/models/review.model";
import { ReviewResponseDTO } from "../../shared/dtos/response.dto";

export interface IReviewMapper {
  toDTO(review: IReviewModel): ReviewResponseDTO;
  toDTOs(entities: IReviewModel[]): ReviewResponseDTO[];
}
