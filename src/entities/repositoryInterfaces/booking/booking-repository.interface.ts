import { IBookingModal } from "frameworks/database/mongo/models/booking.model";
import { IBaseRepository } from "../IBaseRepository.interface";
import { ObjectId } from "mongoose";

export interface IBookingRepository extends IBaseRepository<IBookingModal> {
  getTotalParticipantsForDate(
    activityId: ObjectId,
    date: Date,
  ): Promise<number>;
}
