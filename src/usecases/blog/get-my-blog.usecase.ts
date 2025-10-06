import { inject, injectable } from "tsyringe";
import { IGetMyBlogsUsecase } from "../../entities/usecaseInterfaces/blog/get-my-blog.usecase.interface";
import { IBlogRepository } from "../../entities/repositoryInterfaces/Blog/blog-repository.interface";
import { BlogMapper } from "../../shared/mappers/blog.mapper";
import { IBlogModel } from "../../frameworks/database/mongo/models/blog.model";

@injectable()
export class GetMyBlogsUsecase implements IGetMyBlogsUsecase {
  constructor(
    @inject("IBlogRepository")
    private _blogRepository: IBlogRepository,

    @inject(BlogMapper)
    private _blogMapped: BlogMapper,
  ) {}

  async execute(
    id: string,
    limit: number,
    skip: number,
  ): Promise<{ items: object[]; total: number }> {
    const data = { userId: id, isBlocked: false };

    const result = await this._blogRepository.findAll(limit, skip, data);

    const mappedBlogs = this._blogMapped.toDTOs(result.items as IBlogModel[]);

    return { items: mappedBlogs, total: result.total };
  }
}
