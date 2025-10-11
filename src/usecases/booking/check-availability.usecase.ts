import { inject, injectable } from "tsyringe";
import { ICheckBookingAvailabiltyUsecase } from "../../entities/usecaseInterfaces/booking/check-availabilty.usecase.interface";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { IActivityRepository } from "../../entities/repositoryInterfaces/activity/activityRepository.interface";
import { BookingDTO } from "../../shared/dtos/Auth.dto";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";

@injectable()
export class CheckBookingAvailabilityUsecase
  implements ICheckBookingAvailabiltyUsecase
{
  constructor(
    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,

    @inject("IActivityRepository")
    private _activityRepository: IActivityRepository,
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

    if (!activity)
      throw new AppError("Activity Not Fount", HttpStatusCode.NOT_FOUND);

    const availableCount = activity.maxCapacity - totalBookingCount;

    if (availableCount < data.participantCount)
      throw new AppError(
        "Not enought seats are availabe, please reduce participant count. or change the date!",
        HttpStatusCode.BAD_REQUEST,
      );

    return;
  }
}
