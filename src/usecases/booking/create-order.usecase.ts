import { inject, injectable } from "tsyringe";
import { razorpay } from "../../shared/utils/razorpay";
import { ICreateOrderUsecase } from "../../entities/usecaseInterfaces/booking/create-order.usecase.interface";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { ICacheService } from "../../entities/serviceInterfaces/cache-service.interface";
import { BookingDTO } from "../../shared/dtos/Auth.dto";

@injectable()
export class CreateOrderUsecase implements ICreateOrderUsecase {
  constructor(
    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,

    @inject("ICacheService")
    private _cacheService: ICacheService,
  ) {}

  async execute(data: BookingDTO): Promise<object> {
    const order = await razorpay.orders.create({
      amount: data.pricePerParticipant * data.participantCount * 100,
      currency: "INR",
      receipt: `rcpt_${data.activityId}`,
      notes: {
        activityId: data.activityId,
      },
    });

    data.razporpayOrderId = order.id;

    await this._cacheService.delByPattern(`order:*`);

    const bookedActivity = await this._bookingRepository.save(data);

    return { ...bookedActivity.toObject(), ...order };
  }
}
