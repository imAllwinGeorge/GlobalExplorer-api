import { IActivityRepository } from "entities/repositoryInterfaces/activity/activityRepository.interface";
import { IBookingRepository } from "entities/repositoryInterfaces/booking/booking-repository.interface";
import { IHostRepository } from "entities/repositoryInterfaces/users/host-repository.interface";
import { IGetActivityDetailsUsecase } from "entities/usecaseInterfaces/activity/get-activity-details.usecase.interface";
import { IActivityModel } from "frameworks/database/mongo/models/activity.model";
import { inject, injectable } from "tsyringe";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

@injectable()
export class GetActivityDetailsUsecase implements IGetActivityDetailsUsecase {
  constructor(
    @inject("IActivityRepository")
    private _activityRepository: IActivityRepository,

    @inject("IHostRepository")
    private _hostRepository: IHostRepository,

    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,
  ) {}

  async execute(id: string): Promise<{
    activity: IActivityModel;
    razorpayAccountId: string;
    availability: {
      date: string;
      availableSeats: number;
    }[];
  }> {
    const activity = await this._activityRepository.findOne({ _id: id });
    if (!activity) throw new Error("Failed to fetch activity details");
    const razorpayAccountId = await this._hostRepository.getRazorpayAccountId(
      activity.userId,
    );
    const result = [];

    // Initialize today in Asia/Kolkata
    const today = toZonedTime(new Date(), "Asia/Kolkata");
    today.setHours(0, 0, 0, 0); // Midnight in Asia/Kolkata

    console.log(
      "Today (Asia/Kolkata):",
      formatInTimeZone(today, "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss zzz"),
    );

    for (let i = 0; i < 10; i++) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + i);
      targetDate.setHours(0, 0, 0, 0); // Midnight in Asia/Kolkata

      const weekday = formatInTimeZone(targetDate, "Asia/Kolkata", "EEEE");

      console.log(
        "Target date (Asia/Kolkata):",
        formatInTimeZone(targetDate, "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss zzz"),
        "Weekday:",
        weekday,
      );

      if (
        activity.recurrenceDays
          .map((day) => day.toLowerCase())
          .includes(weekday.toLowerCase())
      ) {
        const bookings =
          await this._bookingRepository.getTotalParticipantsForDate(
            activity._id,
            targetDate,
          );

        console.log(
          "Bookings for",
          formatInTimeZone(targetDate, "Asia/Kolkata", "yyyy-MM-dd"),
          ":",
          bookings,
        );

        const availableSeats = activity.maxCapacity - bookings;
        result.push({
          date: formatInTimeZone(targetDate, "Asia/Kolkata", "yyyy-MM-dd"),
          availableSeats: Math.max(0, availableSeats),
        });
      }
    }

    return { activity, razorpayAccountId, availability: result };
  }
}
