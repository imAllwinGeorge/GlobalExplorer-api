import { inject, injectable } from "tsyringe";
import { IBookActivityUsecase } from "../../entities/usecaseInterfaces/booking/book.activity.usecase.interface";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { IpaymentService } from "../../entities/serviceInterfaces/razorpay-service.interface";
import { IHostRepository } from "../../entities/repositoryInterfaces/users/host-repository.interface";
import { INotificationService } from "../../entities/serviceInterfaces/notification-service.interface";
import { INotificationRepository } from "../../entities/repositoryInterfaces/notification/notificationRepository";
import { ICacheService } from "../../entities/serviceInterfaces/cache-service.interface";
import { BookingDTO } from "../../shared/dtos/Auth.dto";
import { BookingResponseDTO } from "../../shared/dtos/response.dto";
import {
  HttpStatusCode,
  NOTIFICATION_EVENT,
  NOTIFICATION_TYPE,
} from "../../shared/constants/constants";
import { BookingMapper } from "../../shared/mappers/booking.mapper";
import { AppError } from "../../shared/errors/appError";
import { IReservationRepository } from "../../entities/repositoryInterfaces/reservation/reservation-repository.interface";
import { IAvailabilityRepository } from "../../entities/repositoryInterfaces/availability/availability-repository.interface";
import mongoose from "mongoose";
import logger from "../../infrastructures/logger";

@injectable()
export class BookActivityUsecase implements IBookActivityUsecase {
  constructor(
    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,

    @inject("IReservationRepository")
    private _reservationRepository: IReservationRepository,

    @inject("IAvailabilityRepository")
    private _availabilityRepository: IAvailabilityRepository,

    @inject("IPaymentService")
    private _paymentService: IpaymentService,

    @inject("IHostRepository")
    private _hostRepository: IHostRepository,

    @inject("INotificationService")
    private _notificationService: INotificationService,

    @inject("INotificationRepository")
    private _notificationRepository: INotificationRepository,

    @inject("ICacheService")
    private _cacheService: ICacheService,

    @inject(BookingMapper)
    private _bookingMapper: BookingMapper,
  ) {}

  async execute(data: BookingDTO): Promise<BookingResponseDTO> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await this._cacheService.delByPattern("order:*");

      const reservation = await this._reservationRepository.findOne(
        {
          userId: data.userId,
          activityId: data.activityId,
          date: data.date,
          status: "PENDING",
        },
        session,
      );

      if (!reservation) {
        throw new AppError(
          "Reservation Expired or not found",
          HttpStatusCode.BAD_REQUEST,
        );
      }

      const amount = data.pricePerParticipant * data.participantCount;

      const commission = amount * 0.1;

      const amountToHost = amount - commission;

      const hostAccountId = await this._hostRepository.getRazorpayAccountId(
        data.hostId,
      );

      const result = await this._paymentService.createTransferWithHold({
        paymentId: data.razorpayPaymentId as string,
        hostRazorpayAccountId: hostAccountId,
        amountToHost,
        commissionAmount: commission,
      });

      data.razorpayTransferId = result.transferId;
      data.paymentStatus = "paid";

      const booking = await this._bookingRepository.save(data, session);

      await this._reservationRepository.findOneAndUpdate(
        { _id: reservation._id },
        { status: "CONFIRMED" },
        session,
      );

      const [userNotification, hostNotification] = await Promise.all([
        this._notificationRepository.save(
          {
            userId: booking?.userId,
            message: `Your booking confirmed for ${booking?.activityTitle}`,
            type: NOTIFICATION_TYPE.BOOKING,
          },
          session,
        ),

        this._notificationRepository.save(
          {
            userId: booking?.hostId,
            message: `New Booking for ${booking?.activityTitle}`,
            type: NOTIFICATION_TYPE.BOOKING,
          },
          session,
        ),
      ]);

      await session.commitTransaction();
      session.endSession();

      if (userNotification) {
        await this._notificationService.emitNotification(
          booking?.userId as string,
          userNotification,
          NOTIFICATION_EVENT.SEND_NOTIFICATION,
        );
      }

      if (hostNotification) {
        await this._notificationService.emitNotification(
          booking?.hostId as string,
          hostNotification,
          NOTIFICATION_EVENT.SEND_NOTIFICATION,
        );
      }

      if (!booking)
        throw new AppError(
          "We Couldn't process the booking",
          HttpStatusCode.INTERNAL_SERVER_ERROR,
        );

      return this._bookingMapper.toDTO(booking);
    } catch (error) {
      logger.error(error);

      await session.abortTransaction();
      session.endSession();

      if (data.activityId && data.date && data.participantCount) {
        await this._availabilityRepository.findOneAndUpdate(
          { activityId: data.activityId, date: data.date },
          { $inc: { availableSeats: data.participantCount } },
        );
      }

      throw new AppError(
        "Booking confirmation failed. Please try again.",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
