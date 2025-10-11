import { inject, injectable } from "tsyringe";
import { BlogMapper } from "../../shared/mappers/blog.mapper";
import { IGetAllBlogUsecase } from "../../entities/usecaseInterfaces/blog/get-all-blog.usecase.interface";
import { IBlogRepository } from "../../entities/repositoryInterfaces/Blog/blog-repository.interface";
import { ICacheService } from "../../entities/serviceInterfaces/cache-service.interface";
import { IBlogModel } from "../../frameworks/database/mongo/models/blog.model";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";

@injectable()
export class GetAllBlogUsecase implements IGetAllBlogUsecase {
  constructor(
    @inject("IBlogRepository")
    private _blogRepository: IBlogRepository,

    @inject("ICacheService")
    private _cacheService: ICacheService,

    @inject(BlogMapper)
    private _blogMapper: BlogMapper,
  ) {}

  async execute(
    limit: number,
    skip: number,
    filter: object,
  ): Promise<{ items: object[]; total: number }> {
    const cachekey = `blog:${skip / limit + 1}`;

    const cached = await this._cacheService.get(cachekey);

    if (cached) return cached as { items: object[]; total: number };

    const result = await this._blogRepository.findAll(limit, skip, filter);

    if (!result.items)
      throw new AppError(
        "We can not process the request... Please try again.",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );

    await this._cacheService.set(cachekey, result, 120);

    const mappedBlogs = this._blogMapper.toDTOs(result.items as IBlogModel[]);

    return { items: mappedBlogs, total: result.total };
  }
}
