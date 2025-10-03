import { IReviewModel } from "frameworks/database/mongo/models/review.model";
import { IBaseRepository } from "../IBaseRepository.interface";

export type IReviewRepository = IBaseRepository<IReviewModel>;
