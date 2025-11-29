import { IAvailabilityModel } from "../../../frameworks/database/mongo/models/availability.model";
import { BookingWithUser } from "../../../shared/types/types";

export interface IActivityAvailabilityUsecase {
  execute(
    activityId: string,
    date: string,
  ): Promise<{
    availabilities: IAvailabilityModel[];
    bookings: BookingWithUser[];
  }>;
}
