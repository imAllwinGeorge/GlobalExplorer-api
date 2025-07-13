import { IBookingEntitiy } from "entities/models/booking.entity";
import { Document, model, ObjectId, Schema } from "mongoose";

export interface IBookingModal extends IBookingEntitiy, Document {
  _id: ObjectId;
}

const BookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    activityId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Activity",
    },
    activityTitle: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    participantCount: {
      type: Number,
      required: true,
    },
    pricePerParticipant: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Payment",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    razorpayPaymentId: {
      type: String,
    },
    razpayOrderId: {
      type: String,
    },
    rezorpaySignature: {
      type: String,
    },
    bookingStatus: {
      type: String,
      enum: ["pending", "cancelled", "completed"],
      default: "pending",
    },
    hostId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Host",
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
    cancellationReason: {
      type: String,
    },
    isRefunded: {
      type: Boolean,
      default: false,
    },
    refundId: {
      type: String,
    },
    refundAmount: {
      type: Number,
    },
    refundStatus: {
      type: String,
      enum: ["initialized", "completed", "failed"],
    },
  },
  {
    timestamps: true,
  },
);

export const BookingModel = model<IBookingModal>("Booking", BookingSchema);
