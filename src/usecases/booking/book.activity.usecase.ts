import { IBookingRepository } from "entities/repositoryInterfaces/booking/booking-repository.interface";
import { INotificationRepository } from "entities/repositoryInterfaces/notification/notificationRepository";
import { IHostRepository } from "entities/repositoryInterfaces/users/host-repository.interface";
import { ICacheService } from "entities/serviceInterfaces/cache-service.interface";
import { INotificationService } from "entities/serviceInterfaces/notification-service.interface";
import { IpaymentService } from "entities/serviceInterfaces/razorpay-service.interface";
import { IBookActivityUsecase } from "entities/usecaseInterfaces/booking/book.activity.usecase.interface";
import { IBookingModal } from "frameworks/database/mongo/models/booking.model";
import {
  NOTIFICATION_EVENT,
  NOTIFICATION_TYPE,
} from "shared/constants/constants";
import { BookingDTO } from "shared/dtos/Auth.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class BookActivityUsecase implements IBookActivityUsecase {
  constructor(
    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,

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
  ) {}

  async execute(data: BookingDTO, id: string): Promise<IBookingModal> {
    await this._cacheService.delByPattern("order:*");

    const amount = data.pricePerParticipant * data.participantCount;

    const commission = amount * 0.1;

    const amountToHost = amount - commission;

    const hostAccountId = await this._hostRepository.getRazorpayAccountId(
      data.hostId,
    );

    console.log("booking activity data :     ", data);
    // const adminAccountId = await this._paymentService.getMyAccountId();

    const result = await this._paymentService.createTransferWithHold({
      paymentId: data.razorpayPaymentId as string,
      hostRazorpayAccountId: hostAccountId,
      amountToHost,
      commissionAmount: commission,
      // adminAccountId,
    });

    data.razorpayTransferId = result.transferId;
    data.paymentStatus = "paid";

    const booking = await this._bookingRepository.findOneAndUpdate(
      { _id: id },
      data,
    );

    const userNotification = await this._notificationRepository.save({
      userId: booking?.userId,
      message: `Your booking confirmed for ${booking?.activityTitle}`,
      type: NOTIFICATION_TYPE.BOOKING,
    });

    const hostNotification = await this._notificationRepository.save({
      userId: booking?.hostId,
      message: `New Booking for ${booking?.activityTitle}`,
      type: NOTIFICATION_TYPE.BOOKING,
    });

    console.log("user Notification:  ", userNotification);
    console.log("host Notification: ", hostNotification);

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

    console.log("BBBBBBBBoooking :  ", booking);

    if (!booking) throw new Error("We Couldn't process the booking");
    return booking;
  }
}
