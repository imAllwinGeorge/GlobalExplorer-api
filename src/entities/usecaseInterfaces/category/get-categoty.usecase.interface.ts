import { CategoryResponseDTO } from "../../../shared/dtos/response.dto";

export interface IGetCategoryUsecase {
  execute(filter: object): Promise<CategoryResponseDTO>;
}
