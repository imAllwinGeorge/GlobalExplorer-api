import { IBookingRepository } from "entities/repositoryInterfaces/booking/booking-repository.interface";
import { INotificationRepository } from "entities/repositoryInterfaces/notification/notificationRepository";
import { INotificationService } from "entities/serviceInterfaces/notification-service.interface";
import { IpaymentService } from "entities/serviceInterfaces/razorpay-service.interface";
import { ICancelBookingUsecase } from "entities/usecaseInterfaces/booking/cancel.booking.usecase.interface";
import { IBookingModal } from "frameworks/database/mongo/models/booking.model";
import {
  NOTIFICATION_EVENT,
  NOTIFICATION_TYPE,
} from "shared/constants/constants";
import { inject, injectable } from "tsyringe";

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
  ) {}

  async execute(id: string, message: string): Promise<IBookingModal> {
    const booking = await this._bookingRepository.findById({ _id: id });
    if (!booking) throw new Error("Invalid booking");
    const now = new Date();
    const bookingDate = new Date(booking.date);

    const timeDiff = bookingDate.getTime() - now.getTime();
    const ONE_DAY_MS = 24 * 60 * 60 * 1000;

    if (timeDiff < ONE_DAY_MS) {
      throw new Error(
        "Bookings can only be cancelled at least 1 day before the activity Day.",
      );
    }

    const amount = booking.participantCount * booking.pricePerParticipant * 0.9;
    console.log(booking);
    const refundId = await this._paymentService.refundPayment(
      booking.razorpayPaymentId as string,
      amount,
    );
    console.log("refundId              :-", refundId);
    const cancelledBooking = await this._bookingRepository.findOneAndUpdate(
      { _id: id },
      {
        cancellationReason: message,
        isCancelled: true,
        isRefunded: true,
        refundId,
      },
    );
    if (!cancelledBooking) throw new Error("Cancellation failed.");

    const notification = await this._notificationRepository.save({
      userId: booking.userId,
      message: `Booking Cancelled for ${booking.activityTitle}`,
      type: NOTIFICATION_TYPE.CACELLING,
    });

    await this._notificationService.emitNotification(
      booking.userId,
      notification,
      NOTIFICATION_EVENT.SEND_NOTIFICATION,
    );
    return cancelledBooking;
  }
}
