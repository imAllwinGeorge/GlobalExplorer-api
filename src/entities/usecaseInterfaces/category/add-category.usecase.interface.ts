import { CategoryResponseDTO } from "../../../shared/dtos/response.dto";

export interface IAddCategoryUsecase {
  execute(data: object): Promise<CategoryResponseDTO>;
}
