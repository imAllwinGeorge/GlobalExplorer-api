import { inject, injectable } from "tsyringe";
import { ICancelBookingUsecase } from "../../entities/usecaseInterfaces/booking/cancel.booking.usecase.interface";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { IpaymentService } from "../../entities/serviceInterfaces/razorpay-service.interface";
import { INotificationService } from "../../entities/serviceInterfaces/notification-service.interface";
import { INotificationRepository } from "../../entities/repositoryInterfaces/notification/notificationRepository";
import { ICacheService } from "../../entities/serviceInterfaces/cache-service.interface";
import { BookingResponseDTO } from "../../shared/dtos/response.dto";
import {
  HttpStatusCode,
  NOTIFICATION_EVENT,
  NOTIFICATION_TYPE,
} from "../../shared/constants/constants";
import { AppError } from "../../shared/errors/appError";
import mongoose from "mongoose";
import { IAvailabilityRepository } from "../../entities/repositoryInterfaces/availability/availability-repository.interface";
import logger from "../../infrastructures/logger";
import { IBookingMapper } from "../../entities/mapperInterfaces/booking-mapper.interface";

@injectable()
export class CancelBookingUsecase implements ICancelBookingUsecase {
  constructor(
    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,

    @inject("IPaymentService")
    private _paymentService: IpaymentService,

    @inject("INotificationService")
    private _notificationService: INotificationService,

    @inject("INotificationRepository")
    private _notificationRepository: INotificationRepository,

    @inject("IAvailabilityRepository")
    private _availabilityRepository: IAvailabilityRepository,

    @inject("ICacheService")
    private _cacheService: ICacheService,

    @inject("IBookingMapper")
    private _bookingMapper: IBookingMapper,
  ) {}

  async execute(id: string, message: string): Promise<BookingResponseDTO> {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      await this._cacheService.delByPattern(`order:*`);

      const booking = await this._bookingRepository.findById(
        { _id: id },
        session,
      );

      if (!booking)
        throw new AppError(
          "Invalid booking",
          HttpStatusCode.INTERNAL_SERVER_ERROR,
        );

      const now = new Date();

      const bookingDate = new Date(booking.date);

      const timeDiff = bookingDate.getTime() - now.getTime();

      const ONE_DAY_MS = 24 * 60 * 60 * 1000;

      if (timeDiff < ONE_DAY_MS) {
        throw new AppError(
          "Bookings can only be cancelled at least 1 day before the activity Day.",
          HttpStatusCode.BAD_REQUEST,
        );
      }

      const amount =
        booking.participantCount * booking.pricePerParticipant * 0.9;
      const refundId = await this._paymentService.refundPayment(
        booking.razorpayPaymentId as string,
        amount,
      );

      const cancelledBooking = await this._bookingRepository.findOneAndUpdate(
        { _id: id },
        {
          cancellationReason: message,
          isCancelled: true,
          isRefunded: true,
          refundId,
        },
        session,
      );

      if (!cancelledBooking) {
        throw new AppError(
          "Cancellation failed.",
          HttpStatusCode.INTERNAL_SERVER_ERROR,
        );
      }

      const result = await this._availabilityRepository.updateOne(
        {
          activityId: cancelledBooking?.activityId,
          date: cancelledBooking?.date,
        },
        { $inc: { availableSeats: cancelledBooking?.participantCount } },
        session,
      );
      console.log(
        "availability document updated: ",
        result,
        "With count",
        cancelledBooking.participantCount,
      );
      const notification = await this._notificationRepository.save(
        {
          userId: booking.userId,
          message: `Booking Cancelled for ${booking.activityTitle}`,
          type: NOTIFICATION_TYPE.CACELLING,
        },
        session,
      );

      await session.commitTransaction();

      await this._notificationService.emitNotification(
        booking.userId,
        notification,
        NOTIFICATION_EVENT.SEND_NOTIFICATION,
      );

      await this._notificationService.emitNotification(
        booking.hostId,
        notification,
        NOTIFICATION_EVENT.SEND_NOTIFICATION,
      );

      return this._bookingMapper.toDTO(cancelledBooking);
    } catch (error) {
      logger.error(error);

      if (session.inTransaction()) {
        await session.abortTransaction();
      }

      if (error instanceof AppError) {
        throw new AppError(
          error.message as string,
          HttpStatusCode.INTERNAL_SERVER_ERROR,
        );
      }
      throw new AppError(
        "Cancellation failed",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    } finally {
      session.endSession();
    }
  }
}
