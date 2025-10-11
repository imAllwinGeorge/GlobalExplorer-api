import { model, ObjectId, Schema, Types } from "mongoose";
import { IReservationEntity } from "../../../../entities/models/reservation.entity";

export interface IReservationModel extends IReservationEntity {
  _id: ObjectId;
}

const reservationSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    activityId: {
      type: Types.ObjectId,
      ref: "Activity",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED"],
      default: "PENDING",
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

reservationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export const ReservationModel = model<IReservationModel>(
  "Reservation",
  reservationSchema,
);
