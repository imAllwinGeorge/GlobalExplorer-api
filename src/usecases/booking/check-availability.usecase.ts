import { IActivityRepositoryInterface } from "entities/repositoryInterfaces/activity/activityRepository.interface";
import { IBookingRepositoryInterface } from "entities/repositoryInterfaces/booking/booking-repository.interface";
import { ICheckBookingAvailabiltyUsecase } from "entities/usecaseInterfaces/booking/check-availabilty.usecase.interface";
import { BookingDTO } from "shared/dtos/Auth.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class CheckBookingAvailabilityUsecase
  implements ICheckBookingAvailabiltyUsecase
{
  constructor(
    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepositoryInterface,

    @inject("IActivityRepository")
    private _activityRepository: IActivityRepositoryInterface,
  ) {}

  async execute(data: BookingDTO): Promise<void> {
    const bookings = await this._bookingRepository.find({
      activityId: data.activityId,
      date: data.date,
      isCancelled: false,
    });
    const totalBookingCount = bookings.reduce(
      (acc, curr) => (acc += curr.participantCount),
      0,
    );

    const activity = await this._activityRepository.findOne({
      _id: data.activityId,
    });
    if (!activity) throw new Error("Activity Not Fount");
    const availableCount = activity.maxCapacity - totalBookingCount;
    if (availableCount < data.participantCount)
      throw new Error(
        "Not enought seats are availabe, please reduce participant count. or change the date!",
      );

    return;
  }
}
