import { IBookingModal } from "../../../frameworks/database/mongo/models/booking.model";
import { BookingWithUser } from "../../../shared/types/types";
import { IBaseRepository } from "../IBaseRepository.interface";
import { FilterQuery, ObjectId } from "mongoose";

export interface IBookingRepository extends IBaseRepository<IBookingModal> {
  getTotalParticipantsForDate(
    activityId: ObjectId,
    date: Date,
  ): Promise<number>;

  dashboardData(hostId?: string): Promise<object>;

  checkBookings(userId: string): Promise<number>;

  monthlyBookings(id?: string): Promise<
    {
      _id: { month: number };
      count: number;
    }[]
  >;

  yearlySales(
    year: number,
    id?: string,
  ): Promise<{ _id: { month: number }; count: number }[]>;

  findBookingsWithUser(
    limit: number,
    skip: number,
    filter: FilterQuery<object>,
  ): Promise<BookingWithUser[]>;
}
