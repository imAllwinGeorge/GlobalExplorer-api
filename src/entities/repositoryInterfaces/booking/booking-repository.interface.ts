import { IBookingModal } from "frameworks/database/mongo/models/booking.model";
import { IBaseRepositoryInterface } from "../IBaseRepository.interface";
import { ObjectId } from "mongoose";

export interface IBookingRepositoryInterface
  extends IBaseRepositoryInterface<IBookingModal> {
  getTotalParticipantsForDate(
    activityId: ObjectId,
    date: Date,
  ): Promise<number>;
}
