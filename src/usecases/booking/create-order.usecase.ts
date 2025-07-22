import { IBookingRepository } from "entities/repositoryInterfaces/booking/booking-repository.interface";
import { ICreateOrderUsecase } from "entities/usecaseInterfaces/booking/create-order.usecase.interface";
import { BookingDTO } from "shared/dtos/Auth.dto";
import { razorpay } from "shared/utils/razorpay";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateOrderUsecase implements ICreateOrderUsecase {
  constructor(
    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,
  ) {}

  async execute(data: BookingDTO): Promise<object> {
    console.log(
      "amount     :",
      data.pricePerParticipant * data.participantCount,
    );
    const order = await razorpay.orders.create({
      amount: data.pricePerParticipant * data.participantCount * 100,
      currency: "INR",
      receipt: `rcpt_${data.activityId}`,
      notes: {
        activityId: data.activityId,
      },
    });
    data.razporpayOrderId = order.id;
    const bookedActivity = await this._bookingRepository.save(data);
    return { ...bookedActivity, ...order };
  }
}
