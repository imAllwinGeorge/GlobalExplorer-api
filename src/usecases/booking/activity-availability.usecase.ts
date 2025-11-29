import { inject, injectable } from "tsyringe";
import { IActivityAvailabilityUsecase } from "../../entities/usecaseInterfaces/booking/activity-availability.usecase.interface";
import { IAvailabilityRepository } from "../../entities/repositoryInterfaces/availability/availability-repository.interface";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { IAvailabilityModel } from "../../frameworks/database/mongo/models/availability.model";
import { BookingWithUser } from "../../shared/types/types";
import { Types } from "mongoose";

@injectable()
export class ActivityAvailabilityUsecase
  implements IActivityAvailabilityUsecase
{
  constructor(
    @inject("IAvailabilityRepository")
    private _availabilityRepository: IAvailabilityRepository,

    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,
  ) {}

  async execute(
    activityId: string,
    date: string,
  ): Promise<{
    availabilities: IAvailabilityModel[];
    bookings: BookingWithUser[];
  }> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const filter = {
      activityId: new Types.ObjectId(activityId),
      date: { $gte: startOfDay, $lte: endOfDay },
    };
    console.log("activity availability usecase filter", filter);
    const [availabilities, bookings] = await Promise.all([
      this._availabilityRepository.find(filter),
      this._bookingRepository.findBookingsWithUser(filter),
    ]);

    return {
      availabilities,
      bookings,
    };
  }
}
