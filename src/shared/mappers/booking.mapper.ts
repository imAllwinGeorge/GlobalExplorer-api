import { IBookingModal } from "../../frameworks/database/mongo/models/booking.model";
import { BookingResponseDTO } from "../dtos/response.dto";

export class BookingMapper {
  toDTO(booking: IBookingModal): BookingResponseDTO {
    return {
      _id: booking._id,
      userId: booking.userId,
      activityId: booking.activityId,
      activityTitle: booking.activityTitle,
      date: booking.date,
      participantCount: booking.participantCount,
      pricePerParticipant: booking.pricePerParticipant,
      paymentStatus: booking.paymentStatus,
      razorpayPaymentId: booking.razorpayPaymentId,
      razporpayOrderId: booking.razporpayOrderId,
      razorpaySignatue: booking.razorpaySignatue,
      bookingStatus: booking.bookingStatus,
      hostId: booking.hostId,
      isCancelled: booking.isCancelled,
      cancellationReason: booking.cancellationReason,
      isRefunded: booking.isRefunded,
      refundId: booking.refundId,
      refundAmount: booking.refundAmount,
      refundStatus: booking.refundStatus,
      razorpayTransferId: booking.razorpayTransferId,
      isReleased: booking.isReleased,
      holdUntilDate: booking.holdUntilDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };
  }

  toDTOs(entities: IBookingModal[]): BookingResponseDTO[] {
    return entities.map((entity) => this.toDTO(entity));
  }
}
