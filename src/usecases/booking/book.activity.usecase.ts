import { IBookingRepository } from "entities/repositoryInterfaces/booking/booking-repository.interface";
import { IHostRepository } from "entities/repositoryInterfaces/users/host-repository.interface";
import { IpaymentService } from "entities/serviceInterfaces/razorpay-service.interface";
import { IBookActivityUsecase } from "entities/usecaseInterfaces/booking/book.activity.usecase.interface";
import { IBookingModal } from "frameworks/database/mongo/models/booking.model";
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
  ) {}

  async execute(data: BookingDTO, id: string): Promise<IBookingModal> {
    const amount = data.pricePerParticipant * data.participantCount;
    const commission = amount * 0.1;
    const amountToHost = amount - commission;
    const hostAccountId = await this._hostRepository.getRazorpayAccountId(
      data.hostId,
    );
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
      { id },
      data,
    );
    if (!booking) throw new Error("We Couldn't process the booking");
    return booking;
  }
}
