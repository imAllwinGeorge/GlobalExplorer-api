import { IReviewMapper } from "../../entities/mapperInterfaces/review-mapper.interface";
import { IReviewModel } from "../../frameworks/database/mongo/models/review.model";
import { ReviewResponseDTO } from "../dtos/response.dto";

export class ReviewMapper implements IReviewMapper {
  toDTO(review: IReviewModel): ReviewResponseDTO {
    return {
      _id: review._id,
      entityId: review.entityId,
      userId: review.userId,
      ratiing: review.ratiing,
      title: review.title,
      comment: review.comment,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
  }

  toDTOs(entities: IReviewModel[]): ReviewResponseDTO[] {
    return entities.map((entity) => this.toDTO(entity));
  }
}
