export interface IBookingEntitiy {
  userId: string;
  activityId: string;
  activityTitle: string;
  date: Date;
  participantCount: number;
  pricePerParticipant: number;
  paymentId: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  razorpayPaymentId?: string;
  razporpayOrderId?: string;
  rezorpaySignatue?: string;
  bookingStatus: "pending" | "cancelled" | "completed";
  hostId: string;
  isCancelled: boolean;
  cancellationReason?: string;
  isRefunded: boolean;
  refundId?: string;
  refundAmount?: number;
  refundStatus?: "initialized" | "completed" | "failed";
  updatedAt: Date;
  createdAt: Date;
}
