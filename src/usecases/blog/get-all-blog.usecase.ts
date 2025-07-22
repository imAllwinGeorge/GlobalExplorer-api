import { IBlogRepository } from "entities/repositoryInterfaces/Blog/blog-repository.interface";
import { IGetAllBlogUsecase } from "entities/usecaseInterfaces/blog/get-all-blog.usecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllBlogUsecase implements IGetAllBlogUsecase {
  constructor(
    @inject("IBlogRepository")
    private _blogRepository: IBlogRepository,
  ) {}

  async execute(
    limit: number,
    skip: number,
    filter: object,
  ): Promise<{ items: object[]; total: number }> {
    const result = await this._blogRepository.findAll(limit, skip, filter);
    if (!result.items)
      throw new Error("We can not process the request... Please try again.");
    return result;
  }
}
