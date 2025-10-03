import { IReviewEntity } from "entities/models/review.entity";
import { Document, model, ObjectId, Schema } from "mongoose";

export interface IReviewModel extends IReviewEntity, Document {
  _id: ObjectId;
}

const reviewSchema = new Schema(
  {
    entityId: {
      type: Schema.Types.ObjectId,
      ref: "Activity",
      require: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ReviewModel = model<IReviewModel>("Review", reviewSchema);
