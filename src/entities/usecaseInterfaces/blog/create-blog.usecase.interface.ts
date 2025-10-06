import { BlogDTO } from "../../../shared/dtos/Auth.dto";
import { BlogResponseDTO } from "../../../shared/dtos/response.dto";

export interface ICreateBlogUsecase {
  execute(data: BlogDTO): Promise<BlogResponseDTO>;
}
