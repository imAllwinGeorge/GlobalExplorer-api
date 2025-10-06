import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import {
  BookingModel,
  IBookingModal,
} from "../../frameworks/database/mongo/models/booking.model";
import { BaseRepository } from "./base.repository";
import mongoose, { ObjectId } from "mongoose";

export class BookingRepository
  extends BaseRepository<IBookingModal>
  implements IBookingRepository
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
          isCancelled: false,
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

  async dashboardData(hostId?: string): Promise<object> {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const matchStage: {
      createdAt: { $gte: Date };
      isCancelled: boolean;
      paymentStatus: string;
      hostId?: mongoose.Types.ObjectId;
    } = {
      createdAt: { $gte: firstDayOfMonth },
      isCancelled: false,
      paymentStatus: "paid",
    };

    if (hostId) {
      matchStage.hostId = new mongoose.Types.ObjectId(hostId);
    }
    console.log("match Stage : ", matchStage);
    const topFive = await this.model.aggregate([
      { $match: matchStage },
      { $group: { _id: "$activityId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "activities",
          localField: "_id",
          foreignField: "_id",
          as: "activity",
        },
      },
      { $unwind: "$activity" },
      {
        $project: {
          _id: 1,
          count: 1,
          "activity.activityName": 1,
          "activity.pricePerHead": 1,
        },
      },
    ]);
    console.log("booking repository top 5 query result : ", topFive);
    return topFive;
  }

  async checkBookings(userId: string): Promise<number> {
    const bookings = await this.model.countDocuments({
      userId,
      createdAt: Date.now(),
    });
    return bookings as number;
  }
}
