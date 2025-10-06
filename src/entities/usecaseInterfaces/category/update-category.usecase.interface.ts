import { CategoryResponseDTO } from "../../../shared/dtos/response.dto";

export interface IUpdateCategoryUsecase {
  execute(_id: string, value: object): Promise<CategoryResponseDTO>;
}
