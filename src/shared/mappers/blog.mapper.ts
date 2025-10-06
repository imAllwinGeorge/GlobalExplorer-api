import { IBlogModel } from "../../frameworks/database/mongo/models/blog.model";
import { BlogResponseDTO } from "../dtos/response.dto";

export class BlogMapper {
  toDTO(blog: IBlogModel): BlogResponseDTO {
    return {
      _id: blog._id,
      userId: blog.userId,
      title: blog.title,
      author: blog.author,
      introduction: blog.introduction,
      sections: blog.sections,
      image: blog.image,
      views: blog.views,
      likes: blog.likes,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    };
  }

  toDTOs(entities: IBlogModel[]): BlogResponseDTO[] {
    return entities.map((entity) => this.toDTO(entity));
  }
}
