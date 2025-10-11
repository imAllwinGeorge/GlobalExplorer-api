import { IBookingModal } from "../../../frameworks/database/mongo/models/booking.model";
import { IBaseRepository } from "../IBaseRepository.interface";
import { ObjectId } from "mongoose";

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
}
