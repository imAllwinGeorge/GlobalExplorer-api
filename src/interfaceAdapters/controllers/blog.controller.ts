import { inject, injectable } from "tsyringe";
import { IBlogController } from "../../entities/controllerInterfaces/blog-controller.interface";
import { ICreateBlogUsecase } from "../../entities/usecaseInterfaces/blog/create-blog.usecase.interface";
import { IGetAllBlogUsecase } from "../../entities/usecaseInterfaces/blog/get-all-blog.usecase.interface";
import { IGetMyBlogsUsecase } from "../../entities/usecaseInterfaces/blog/get-my-blog.usecase.interface";
import { IEditBlogUsecase } from "../../entities/usecaseInterfaces/blog/edit-blog.usecase.interface";
import { IDeleteBlogUsecase } from "../../entities/usecaseInterfaces/blog/delete-blog.usecase.interfac";
import { NextFunction, Request, Response } from "express";
import { BlogSection } from "../../entities/models/blog.entity";
import { HttpStatusCode } from "../../shared/constants/constants";
import {
  calculateTotalPages,
  getPaginationParams,
} from "../../shared/utils/pagination.helper";
import { IGetBlogUsecase } from "../../entities/usecaseInterfaces/blog/get-blog.usecase.interface";

@injectable()
export class BlogController implements IBlogController {
  constructor(
    @inject("ICreateBlogUsecase")
    private _createBlogUsecase: ICreateBlogUsecase,

    @inject("IGetAllBlogUsecase")
    private _getAllBlogUsecase: IGetAllBlogUsecase,

    @inject("IGetMyBlogUsecase")
    private _getMyBlogUsecase: IGetMyBlogsUsecase,

    @inject("IGetBlogUsecase")
    private _getBlogUsecase: IGetBlogUsecase,

    @inject("IEditBlogUsecase")
    private _editBlogUsecase: IEditBlogUsecase,

    @inject("IDeleteBlogUsecase")
    private _deleteBlogUsecase: IDeleteBlogUsecase,
  ) {}

  async createBlog(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
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
        image: "",
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
          sections[index].image = file.path;
        } else if (file.fieldname === "coverImage") {
          blog.image = file.path;
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

      res.status(HttpStatusCode.CREATED).json({ blog: newBlog });
    } catch (error) {
      next(error);
    }
  }

  async getBlogs(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data = {};
      const { limit, skip } = getPaginationParams(req);
      const { items, total } = await this._getAllBlogUsecase.execute(
        limit,
        skip,
        data,
      );

      const totalPages = calculateTotalPages(total, limit);
      res.status(HttpStatusCode.OK).json({ blogs: items, totalPages });
    } catch (error) {
      next(error);
    }
  }

  async getBlog(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const blogId = req.params.id;
      console.log("get blog user profile : blog id: ", blogId);
      const blog = await this._getBlogUsecase.execute(blogId);

      res.status(HttpStatusCode.OK).json({ blog });
    } catch (error) {
      next(error);
    }
  }

  async getMyBlogs(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.query.id as string;
      const { limit, skip } = getPaginationParams(req);

      const result = await this._getMyBlogUsecase.execute(userId, limit, skip);
      const totalPages = calculateTotalPages(result.total, limit);

      res.status(HttpStatusCode.OK).json({ blogs: result.items, totalPages });
    } catch (error) {
      next(error);
    }
  }

  async editBlog(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const blogId = req.params.id;
      const body = req.body;
      const files = req.files as Express.Multer.File[];
      console.log(blogId);
      type Sections = {
        sectionTitle?: string;
        content?: string;
        image: string;
      };

      // Parse the sections from string to array
      let parsedSections: Sections[] = [];
      if (body.sections) {
        try {
          parsedSections = JSON.parse(body.sections);
        } catch (err) {
          console.error("Failed to parse sections:", err);
          res.status(400).json({ message: "Invalid sections format" });
          return;
        }
      }

      // Handle image uploads
      if (files && files.length) {
        files.forEach((file) => {
          if (file.fieldname === "mainImage") {
            body.image = file.path;
          } else if (!isNaN(Number(file.fieldname))) {
            // This is a section image
            const sectionIndex = parseInt(file.fieldname);
            if (parsedSections[sectionIndex]) {
              parsedSections[sectionIndex].image = file.path;
            }
          }
        });
      }

      // Replace sections with the updated array
      body.sections = parsedSections;

      const blog = await this._editBlogUsecase.execute(body);

      res.status(HttpStatusCode.OK).json({ blog });
    } catch (error) {
      next(error);
    }
  }

  async deleteBlog(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { blogId } = req.params;

      this._deleteBlogUsecase.execute(blogId);

      res
        .status(HttpStatusCode.OK)
        .json({ message: "Blog Deleted success full" });
    } catch (error) {
      next(error);
    }
  }
}
