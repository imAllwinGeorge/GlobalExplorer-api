import { ActivityResponseDTO } from "../../../shared/dtos/response.dto";
import { ImageGallery } from "../../../shared/types/types";

export interface IUserHomeUsecase {
  execute(
    limit: number,
    skip: number,
  ): Promise<{
    images: ImageGallery[];
    activities: ActivityResponseDTO[];
    totalPages: number;
  }>;
}
