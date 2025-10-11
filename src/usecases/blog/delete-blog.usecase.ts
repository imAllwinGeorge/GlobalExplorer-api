import { inject, injectable } from "tsyringe";
import { IDeleteBlogUsecase } from "../../entities/usecaseInterfaces/blog/delete-blog.usecase.interfac";
import { IBlogRepository } from "../../entities/repositoryInterfaces/Blog/blog-repository.interface";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";
import logger from "../../infrastructures/logger";

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
      logger.error(err);
      throw new AppError(
        "Something went wrong while deleting the blog.",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
