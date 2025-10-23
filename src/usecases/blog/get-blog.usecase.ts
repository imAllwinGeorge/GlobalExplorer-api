import { inject, injectable } from "tsyringe";
import { IBlogRepository } from "../../entities/repositoryInterfaces/Blog/blog-repository.interface";
import { BlogResponseDTO } from "../../shared/dtos/response.dto";
import { IGetBlogUsecase } from "../../entities/usecaseInterfaces/blog/get-blog.usecase.interface";
import { BlogMapper } from "../../shared/mappers/blog.mapper";
import { IBlogModel } from "../../frameworks/database/mongo/models/blog.model";

@injectable()
export class GetBlogUsecase implements IGetBlogUsecase {
  constructor(
    @inject("IBlogRepository")
    private _blogRepository: IBlogRepository,

    @inject(BlogMapper)
    private _blogMapper: BlogMapper,
  ) {}

  async execute(id: string): Promise<BlogResponseDTO> {
    const blog = await this._blogRepository.findById({ _id: id });

    return this._blogMapper.toDTO(blog as IBlogModel);
  }
}
