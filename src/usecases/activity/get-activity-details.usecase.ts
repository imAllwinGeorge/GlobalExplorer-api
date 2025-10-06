import { inject, injectable } from "tsyringe";
import { formatInTimeZone } from "date-fns-tz";
import { IGetActivityDetailsUsecase } from "../../entities/usecaseInterfaces/activity/get-activity-details.usecase.interface";
import { IActivityRepository } from "../../entities/repositoryInterfaces/activity/activityRepository.interface";
import { IHostRepository } from "../../entities/repositoryInterfaces/users/host-repository.interface";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { ICacheService } from "../../entities/serviceInterfaces/cache-service.interface";
import { ActivityMapper } from "../../shared/mappers/activity.mapper";
import { ActivityResponseDTO } from "../../shared/dtos/response.dto";
import { getNextDaysInTimezone } from "../../shared/utils/date.helper";

@injectable()
export class GetActivityDetailsUsecase implements IGetActivityDetailsUsecase {
  constructor(
    @inject("IActivityRepository")
    private _activityRepository: IActivityRepository,

    @inject("IHostRepository")
    private _hostRepository: IHostRepository,

    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,

    @inject("ICacheService")
    private _cacheService: ICacheService,

    @inject(ActivityMapper)
    private _activityMapper: ActivityMapper,
  ) {}

  async execute(id: string): Promise<{
    activity: ActivityResponseDTO;
    razorpayAccountId: string;
    availability: {
      date: string;
      availableSeats: number;
    }[];
  }> {
    const activity = await this._activityRepository.findOne({ _id: id });
    let mappedActivity;
    if (!activity) {
      throw new Error("Failed to fetch activity details");
    } else {
      mappedActivity = this._activityMapper.toDTO(activity);
    }

    const cacheKey = `activity:${id}`;

    const cached = await this._cacheService.get(cacheKey);

    if (cached)
      return cached as {
        activity: ActivityResponseDTO;
        razorpayAccountId: string;
        availability: {
          date: string;
          availableSeats: number;
        }[];
      };

    const razorpayAccountId = await this._hostRepository.getRazorpayAccountId(
      activity.userId,
    );
    // const result = [];

    // // Initialize today in Asia/Kolkata
    // const today = toZonedTime(new Date(), "Asia/Kolkata");
    // today.setHours(0, 0, 0, 0); // Midnight in Asia/Kolkata

    // for (let i = 0; i < 10; i++) {
    //   const targetDate = new Date(today);
    //   targetDate.setDate(today.getDate() + i);
    //   targetDate.setHours(0, 0, 0, 0); // Midnight in Asia/Kolkata

    //   const weekday = formatInTimeZone(targetDate, "Asia/Kolkata", "EEEE");

    //   if (
    //     activity.recurrenceDays
    //       .map((day) => day.toLowerCase())
    //       .includes(weekday.toLowerCase())
    //   ) {
    //     const bookings =
    //       await this._bookingRepository.getTotalParticipantsForDate(
    //         activity._id,
    //         targetDate,
    //       );

    //     const availableSeats = activity.maxCapacity - bookings;
    //     result.push({
    //       date: formatInTimeZone(targetDate, "Asia/Kolkata", "yyyy-MM-dd"),
    //       availableSeats: Math.max(0, availableSeats),
    //     });
    //   }
    // }

    const dates = getNextDaysInTimezone(
      10,
      "Asia/Kolkata",
      activity.recurrenceDays,
    );

    const result = await Promise.all(
      dates.map(async (targetDate) => {
        const bookings =
          await this._bookingRepository.getTotalParticipantsForDate(
            activity._id,
            targetDate,
          );

        const availableSeats = activity.maxCapacity - bookings;

        return {
          date: formatInTimeZone(targetDate, "Asia/Kolkata", "yyyy-MM-dd"),
          availableSeats: Math.max(0, availableSeats),
        };
      }),
    );

    await this._cacheService.set(
      cacheKey,
      { activity: mappedActivity, razorpayAccountId, availability: result },
      120,
    );

    return {
      activity: mappedActivity,
      razorpayAccountId,
      availability: result,
    };
  }
}
