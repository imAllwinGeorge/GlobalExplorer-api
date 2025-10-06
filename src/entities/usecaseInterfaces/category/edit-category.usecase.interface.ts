import { CategoryResponseDTO } from "../../../shared/dtos/response.dto";

export interface IEditCategoryUsecase {
  execute(
    _id: string,
    value: { categoryName: string; description: string },
  ): Promise<CategoryResponseDTO | null>;
}
