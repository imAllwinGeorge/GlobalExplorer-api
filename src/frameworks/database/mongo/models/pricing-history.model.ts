import { model, ObjectId, Schema, Types } from "mongoose";
import { IPricingHistoryEntity } from "../../../../entities/models/pricing-history.entity";

export interface IPricingHistoryModel extends IPricingHistoryEntity {
  _id: ObjectId;
}

const PricingHistorySchema = new Schema(
  {
    activityId: {
      type: Types.ObjectId,
      ref: "Activity",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    oldPrice: {
      type: Number,
      reqiured: true,
    },
    newPrice: {
      type: Number,
      reqiured: true,
    },
    basePrice: {
      type: Number,
      reqiured: true,
    },
    factor: {
      type: Number,
      reqiured: true,
    },
    maxDynamicPercentage: {
      type: Number,
      required: true,
    },
    reason: {
      type: Number,
      reqiured: true,
    },
  },
  {
    timestamps: true,
  },
);

export const PricingHistoryModel = model<IPricingHistoryModel>(
  "PricingHistory",
  PricingHistorySchema,
);
