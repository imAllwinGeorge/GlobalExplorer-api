import { model, ObjectId, Schema, Types } from "mongoose";
import { IAvailabilityEntity } from "../../../../entities/models/availability.entity";

export interface IAvailabilityModel extends IAvailabilityEntity {
  _id: ObjectId;
}

const availabilitySchema = new Schema(
  {
    activityId: {
      type: Types.ObjectId,
      ref: "Activity",
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

availabilitySchema.index({ activityId: 1, date: 1 }, { unique: true });

export const AvailabilityModel = model<IAvailabilityModel>(
  "Availability",
  availabilitySchema,
);
