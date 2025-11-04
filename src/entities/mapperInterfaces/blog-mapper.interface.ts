import { IBlogModel } from "../../frameworks/database/mongo/models/blog.model";
import { BlogResponseDTO } from "../../shared/dtos/response.dto";

export interface IBlogMapper {
  toDTO(blog: IBlogModel): BlogResponseDTO;
  toDTOs(entities: IBlogModel[]): BlogResponseDTO[];
}
