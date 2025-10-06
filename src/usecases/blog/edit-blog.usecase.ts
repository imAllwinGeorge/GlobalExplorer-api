import { inject, injectable } from "tsyringe";
import { IEditBlogUsecase } from "../../entities/usecaseInterfaces/blog/edit-blog.usecase.interface";
import { IBlogRepository } from "../../entities/repositoryInterfaces/Blog/blog-repository.interface";
import { ICacheService } from "../../entities/serviceInterfaces/cache-service.interface";
import { BlogMapper } from "../../shared/mappers/blog.mapper";
import { IBlogModel } from "../../frameworks/database/mongo/models/blog.model";
import { BlogResponseDTO } from "../../shared/dtos/response.dto";

@injectable()
export class EditBlogUsecase implements IEditBlogUsecase {
  constructor(
    @inject("IBlogRepository")
    private _blogRepository: IBlogRepository,

    @inject("ICacheService")
    private _cacheService: ICacheService,

    @inject(BlogMapper)
    private _blogMapper: BlogMapper,
  ) {}

  async execute(data: IBlogModel): Promise<BlogResponseDTO> {
    const editedBlog = await this._blogRepository.findOneAndUpdate(
      { _id: data._id },
      data,
    );

    if (!editedBlog)
      throw new Error("Could not find the blog... Please try again");

    await this._cacheService.delByPattern(`activity:*`);

    return this._blogMapper.toDTO(editedBlog);
  }
}
