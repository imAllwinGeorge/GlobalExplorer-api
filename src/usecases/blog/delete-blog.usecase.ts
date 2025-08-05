import { IBlogRepository } from "entities/repositoryInterfaces/Blog/blog-repository.interface";
import { IDeleteBlogUsecase } from "entities/usecaseInterfaces/blog/delete-blog.usecase.interfac";
import { inject, injectable } from "tsyringe";

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
      console.error("Error deleting blog:", err);
      throw new Error("Something went wrong while deleting the blog.");
    }
  }
}
