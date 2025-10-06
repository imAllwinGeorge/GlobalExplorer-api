import { ReviewResponseDTO } from "../../../shared/dtos/response.dto";

export interface IGetReviewUsecase {
  execute(id: string): Promise<ReviewResponseDTO[]>;
}
