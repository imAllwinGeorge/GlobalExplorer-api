import { Document, model, ObjectId, Schema } from "mongoose";
import { IActivityEntity } from "../../../../entities/models/activity.entity";

export interface IActivityModel extends IActivityEntity, Document {
  _id: ObjectId;
}

const ActivitySchema = new Schema(
  {
    activityName: {
      type: String,
      required: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    itenary: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    pricePerHead: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Host",
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], //[longitude, latitude]
        required: true,
      },
    },
    recurrenceDays: {
      type: [String],
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    reportingPlace: {
      type: String,
      required: true,
    },
    reportingTime: {
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

ActivitySchema.index({ location: "2dsphere" });
ActivitySchema.index({ activityName: "text", itenary: "text" });
export const ActivityModel = model<IActivityModel>("Activity", ActivitySchema);
