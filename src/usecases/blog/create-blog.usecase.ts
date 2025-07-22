import { IBlogRepository } from "entities/repositoryInterfaces/Blog/blog-repository.interface";
import { ICreateBlogUsecase } from "entities/usecaseInterfaces/blog/create-blog.usecase.interface";
import { IBlogModel } from "frameworks/database/mongo/models/blog.model";
import { BlogDTO } from "shared/dtos/Auth.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateBlogUsecase implements ICreateBlogUsecase {
  constructor(
    @inject("IBlogRepository")
    private _blogreporitory: IBlogRepository,
  ) {}

  async execute(data: BlogDTO): Promise<IBlogModel> {
    const newBlog = await this._blogreporitory.save(data);

    if (!newBlog)
      throw new Error("Currently we are facing some issue please try again.");

    return newBlog;
  }
}
