import { BlogResponseDTO } from "../../../shared/dtos/response.dto";

export interface IGetBlogUsecase {
  execute(id: string): Promise<BlogResponseDTO>;
}
