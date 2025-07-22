import { IBlogRepository } from "entities/repositoryInterfaces/Blog/blog-repository.interface";
import { IGetMyBlogsUsecase } from "entities/usecaseInterfaces/blog/get-my-blog.usecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetMyBlogsUsecase implements IGetMyBlogsUsecase {
  constructor(
    @inject("IBlogRepository")
    private _blogRepository: IBlogRepository,
  ) {}

  async execute(
    id: string,
    limit: number,
    skip: number,
  ): Promise<{ items: object[]; total: number }> {
    const data = { userId: id, isBlocked: false };
    const result = await this._blogRepository.findAll(limit, skip, data);
    return result;
  }
}
