import { inject, injectable } from "tsyringe";
import { IGetMyBlogsUsecase } from "../../entities/usecaseInterfaces/blog/get-my-blog.usecase.interface";
import { IBlogRepository } from "../../entities/repositoryInterfaces/Blog/blog-repository.interface";
import { IBlogModel } from "../../frameworks/database/mongo/models/blog.model";
import { IBlogMapper } from "../../entities/mapperInterfaces/blog-mapper.interface";

@injectable()
export class GetMyBlogsUsecase implements IGetMyBlogsUsecase {
  constructor(
    @inject("IBlogRepository")
    private _blogRepository: IBlogRepository,

    @inject("IBlogMapper")
    private _blogMapped: IBlogMapper,
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
