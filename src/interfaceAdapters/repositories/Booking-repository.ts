import {
  BookingModel,
  IBookingModal,
} from "frameworks/database/mongo/models/booking.model";
import { BaseRepository } from "./base.repository";
import { IBookingRepositoryInterface } from "entities/repositoryInterfaces/booking/booking-repository.interface";
import mongoose, { ObjectId } from "mongoose";

export class BookingRepository
  extends BaseRepository<IBookingModal>
  implements IBookingRepositoryInterface
{
  constructor() {
    super(BookingModel);
  }

  async getTotalParticipantsForDate(activityId: ObjectId, date: Date) {
    const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(
        2,
        "0",
      )}-${date.getDate().toString().padStart(2, "0")}T00:00:00+05:30`;

    const istMidnight = new Date(dateStr); // this now represents IST midnight as a UTC Date

    const bookings = await this.model.aggregate([
      {
        $match: {
          activityId: new mongoose.Types.ObjectId(activityId.toString()),
          $expr: {
            $eq: [
              {
                $dateTrunc: {
                  date: "$date",
                  unit: "day",
                  timezone: "Asia/Kolkata",
                },
              },
              istMidnight,
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$participantCount" },
        },
      },
    ]);

    return bookings[0]?.total || 0;
  }
}
