import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IReviewController } from "../../entities/controllerInterfaces/review-controller.interface";
import { IWriteReviewUsecase } from "../../entities/usecaseInterfaces/review/write-review.interface";

@injectable()
export class ReviewController implements IReviewController {
  constructor(
    @inject("IWriteReviewUsecase")
    private _writeReviewUsecase: IWriteReviewUsecase,
  ) {}
  async writeReview(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { review } = req.body;

      const newReview = await this._writeReviewUsecase.execute(review);

      res.status(HttpStatusCode.Created).json({ newReview });
    } catch (error) {
      // console.log("write review usecase error: ", error);

      // if (error instanceof Error) {
      //   res.status(HttpStatusCode.BadRequest).json({ message: error.message });
      //   return;
      // }

      // res
      //   .status(HttpStatusCode.InternalServerError)
      //   .json({ message: "Internal Server Error" });

      next(error);
    }
  }
}
