import { inject, injectable } from "tsyringe";
import { ICreateBlogUsecase } from "../../entities/usecaseInterfaces/blog/create-blog.usecase.interface";
import { IBlogRepository } from "../../entities/repositoryInterfaces/Blog/blog-repository.interface";
import { BlogMapper } from "../../shared/mappers/blog.mapper";
import { BlogDTO } from "../../shared/dtos/Auth.dto";
import { BlogResponseDTO } from "../../shared/dtos/response.dto";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";

@injectable()
export class CreateBlogUsecase implements ICreateBlogUsecase {
  constructor(
    @inject("IBlogRepository")
    private _blogreporitory: IBlogRepository,

    @inject(BlogMapper)
    private _blogMapper: BlogMapper,
  ) {}

  async execute(data: BlogDTO): Promise<BlogResponseDTO> {
    const newBlog = await this._blogreporitory.save(data);

    if (!newBlog)
      throw new AppError(
        "Currently we are facing some issue please try again.",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );

    return this._blogMapper.toDTO(newBlog);
  }
}
