import { IBookingRepository } from "entities/repositoryInterfaces/booking/booking-repository.interface";
import { ICheckActivityBooking } from "entities/usecaseInterfaces/booking/check.activity-bookings.inteface";
import { inject, injectable } from "tsyringe";

@injectable()
export class CheckActivityBooking implements ICheckActivityBooking {
  constructor(
    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,
  ) {}

  async execute(userId: string): Promise<boolean> {
    const result = await this._bookingRepository.checkBookings(userId);

    return result >= 5 ? false : true;
  }
}
