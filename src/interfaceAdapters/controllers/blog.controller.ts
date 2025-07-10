import { IBlogControllerInterface } from "entities/controllerInterfaces/blog-controller.interface";
import { BlogSection } from "entities/models/blog.entity";
import { ICreateBlogUsecaseInterface } from "entities/usecaseInterfaces/blog/create-blog.usecase.interface";
import { IGetAllBlogUsecaseInterface } from "entities/usecaseInterfaces/blog/get-all-blog.usecase.interface";
import { Request, Response } from "express";
import { HttpStatusCode } from "shared/constants/statusCodes";
import { inject, injectable } from "tsyringe";

@injectable()
export class BlogController implements IBlogControllerInterface {
  constructor(
    @inject("ICreateBlogUsecase")
    private _createBlogUsecase: ICreateBlogUsecaseInterface,

    @inject("IGetAllBlogUsecase")
    private _getAllBlogUsecase: IGetAllBlogUsecaseInterface,
  ) {}

  async createBlog(req: Request, res: Response): Promise<void> {
    try {
      console.log(" Request body", req.body);
      console.log(" Files  ", req.files);

      const files = req.files as Express.Multer.File[];
      const body = req.body;

      const sections: {
        sectionTitle?: string;
        content?: string;
        image?: string;
      }[] = [];

      // Step 1: Base blog object
      const blog = {
        userId: body.userId,
        title: body.title,
        author: body.author,
        introduction: body.introduction,
        image: "", // to be set if found
        sections: [],
      };

      let parsedSections: BlogSection[] = [];
      try {
        parsedSections = JSON.parse(body.sections);
      } catch (err) {
        console.log(err);
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: "Invalid sections JSON" });
        return;
      }

      // Step 3: Attach section images and cover image
      files.forEach((file) => {
        if (file.fieldname.startsWith("section-image-")) {
          const index = parseInt(file.fieldname.split("section-image-")[1]);
          if (!sections[index]) sections[index] = {};
          sections[index].image = file.filename;
        } else if (file.fieldname === "coverImage") {
          blog.image = file.filename;
        }
      });

      // Step 4: Merge parsedSections (title/content) with images
      parsedSections.forEach((section, index) => {
        if (!sections[index]) sections[index] = {};
        sections[index].sectionTitle = section.sectionTitle;
        sections[index].content = section.content;
      });

      // Step 5: Assign final sections to blog
      (blog.sections as object) = sections;

      const newBlog = await this._createBlogUsecase.execute(blog);
      console.log(newBlog);
      res.status(HttpStatusCode.OK).json({ blog: newBlog });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
    }
  }

  async getBlogs(req: Request, res: Response): Promise<void> {
    try {
      const data = {};
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
      const { items, total } = await this._getAllBlogUsecase.execute(
        limit,
        skip,
        data,
      );
      const totalPages = Math.ceil(total / limit);
      res.status(HttpStatusCode.OK).json({ blogs: items, totalPages });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ meassage: error.message });
      }
    }
  }
}
