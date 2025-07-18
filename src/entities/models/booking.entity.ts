export interface IBookingEntitiy {
  userId: string;
  activityId: string;
  activityTitle: string;
  date: Date;
  participantCount: number;
  pricePerParticipant: number;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  razorpayPaymentId?: string;
  razporpayOrderId?: string;
  razorpaySignatue?: string;
  bookingStatus: "pending" | "cancelled" | "completed";
  hostId: string;
  isCancelled: boolean;
  cancellationReason?: string;
  isRefunded: boolean;
  refundId?: string;
  refundAmount?: number;
  refundStatus?: "initialized" | "completed" | "failed";
  razorpayTransferId?: string;
  isReleasedId: boolean;
  holdUntilDate: Date;
  updatedAt: Date;
  createdAt: Date;
}
