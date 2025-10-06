import { inject, injectable } from "tsyringe";
import { IDeleteBlogUsecase } from "../../entities/usecaseInterfaces/blog/delete-blog.usecase.interfac";
import { IBlogRepository } from "../../entities/repositoryInterfaces/Blog/blog-repository.interface";

@injectable()
export class DeleteBlogUsecase implements IDeleteBlogUsecase {
  constructor(
    @inject("IBlogRepository")
    private _blogRepository: IBlogRepository,
  ) {}

  async execute(id: string): Promise<void> {
    try {
      await this._blogRepository.delete({ _id: id });
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong while deleting the blog.");
    }
  }
}
