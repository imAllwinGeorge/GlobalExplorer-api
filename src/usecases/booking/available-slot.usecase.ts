import { inject, injectable } from "tsyringe";
import { IAvailableSlotUsecase } from "../../entities/usecaseInterfaces/booking/available-slots.usecase.interface";
import { IActivityRepository } from "../../entities/repositoryInterfaces/activity/activityRepository.interface";
import { IAvailabilityRepository } from "../../entities/repositoryInterfaces/availability/availability-repository.interface";
import { formatInTimeZone } from "date-fns-tz";
import { getNextDaysInTimezone } from "../../shared/utils/date.helper";

@injectable()
export class AvailableSlotUsecase implements IAvailableSlotUsecase {
  constructor(
    @inject("IActivityRepository")
    private _activityRepository: IActivityRepository,

    @inject("IAvailabilityRepository")
    private _availabilityRepository: IAvailabilityRepository,
  ) {}

  async execute(hostId: string): Promise<
    {
      activityId: string;
      activityName: string;
      availability: { date: string; availableSeats: number }[];
    }[]
  > {
    const activities = await this._activityRepository.find({ userId: hostId });

    const result = await Promise.all(
      activities.map(async (activity) => {
        const dates = getNextDaysInTimezone(
          10,
          "Asia/Kolkata",
          activity.recurrenceDays,
        );

        const availabilityList = await Promise.all(
          dates.map(async (targetDate) => {
            const dateStr = formatInTimeZone(
              targetDate,
              "Asia/Kolkata",
              "yyyy-MM-dd",
            );

            const availability =
              await this._availabilityRepository.findOrCreateOne(
                { activityId: activity._id, date: dateStr },
                {
                  $setOnInsert: {
                    activityId: activity._id,
                    date: dateStr,
                    totalSeats: activity.maxCapacity,
                    availableSeats: activity.maxCapacity,
                  },
                },
              );

            return {
              date: dateStr,
              availableSeats: availability.availableSeats,
            };
          }),
        );

        return {
          activityId: activity._id.toString(),
          activityName: activity.activityName,
          availability: availabilityList,
        };
      }),
    );

    return result;
  }
}
