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
  NOTIFICATION_EVENT,
  NOTIFICATION_TYPE,
} from "../../shared/constants/constants";
import { BookingMapper } from "../../shared/mappers/booking.mapper";

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

    @inject(BookingMapper)
    private _bookingMapper: BookingMapper,
  ) {}

  async execute(data: BookingDTO, id: string): Promise<BookingResponseDTO> {
    await this._cacheService.delByPattern("order:*");

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

    if (!booking) throw new Error("We Couldn't process the booking");

    return this._bookingMapper.toDTO(booking);
  }
}
