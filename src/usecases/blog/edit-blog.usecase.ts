import { IBlogRepository } from "entities/repositoryInterfaces/Blog/blog-repository.interface";
import { IEditBlogUsecase } from "entities/usecaseInterfaces/blog/edit-blog.usecase.interface";
import { IBlogModel } from "frameworks/database/mongo/models/blog.model";
import { inject, injectable } from "tsyringe";

@injectable()
export class EditBlogUsecase implements IEditBlogUsecase {
  constructor(
    @inject("IBlogRepository")
    private _blogRepository: IBlogRepository,
  ) {}

  async execute(data: IBlogModel): Promise<IBlogModel> {
    const editedBlog = await this._blogRepository.findOneAndUpdate(
      { _id: data._id },
      data,
    );
    if (!editedBlog)
      throw new Error("Could not find the blog... Please try again");
    return editedBlog;
  }
}
