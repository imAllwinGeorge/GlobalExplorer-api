import { ICategoryEntity } from "entities/models/category.entity";
import { model, ObjectId, Schema } from "mongoose";

export interface ICategoryModel extends ICategoryEntity, Document {
  _id: ObjectId;
}

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const CategoryModel = model<ICategoryModel>("Category", categorySchema);
