import { IActivityEntity } from "entities/models/activity.entity";
import { Document, model, ObjectId, Schema } from "mongoose";

export interface IActivityModel extends IActivityEntity, Document {
  _id: ObjectId;
}

const ActivitySchema = new Schema(
  {
    activityName: {
      type: String,
      require: true,
    },
    maxCapacity: {
      type: Number,
      require: true,
    },
    itenary: {
      type: String,
      require: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Category",
    },
    pricePerHead: {
      type: Number,
      require: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Host",
    },
    street: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    district: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    postalCode: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
    location: {
      type: [Number, Number],
      require: true,
    },
    images: {
      type: [String],
      require: true,
    },
    reportingPlace: {
      type: String,
      require: true,
    },
    reportingTime: {
      type: String,
      require: true,
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

export const ActivityModel = model<IActivityModel>("Activity", ActivitySchema);
