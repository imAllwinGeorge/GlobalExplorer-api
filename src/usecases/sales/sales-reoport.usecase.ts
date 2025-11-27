// import { inject, injectable } from "tsyringe";
// import { IHostSalesReportUsecase } from "../../entities/usecaseInterfaces/sales/host-sales-report.interface";
// import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
// import { SalesFilters, BookingWithUser } from "../../shared/types/types";
// import { AppError } from "../../shared/errors/appError";
// import { HttpStatusCode } from "../../shared/constants/constants";
// import { IBookingModal } from "../../frameworks/database/mongo/models/booking.model";
// import { FilterQuery } from "mongoose";

import { inject, injectable } from "tsyringe";
import { HttpStatusCode } from "../../shared/constants/constants";
import { AppError } from "../../shared/errors/appError";
import { ISalesReportUsecase } from "../../entities/usecaseInterfaces/sales/sales-report.interface";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { BookingWithUser, SalesReportQuery } from "../../shared/types/types";
import { IBookingModal } from "../../frameworks/database/mongo/models/booking.model";
import { FilterQuery, Types } from "mongoose";
import { resolveDateRange } from "../../shared/utils/date.helper";

// @injectable()
// export class HostSalesReportUsecase implements IHostSalesReportUsecase {
//   constructor(
//     @inject("IBookingRepository")
//     private _bookingRepository: IBookingRepository
//   ) {}

//   async execute(
//     hostId: string,
//     filter: SalesFilters,
//     limit: number,
//     skip: number
//   ): Promise<BookingWithUser[]> {
//     const object: FilterQuery<object> = {
//       hostId,
//       paymentStatus: "paid",
//     };

//     if (filter.dateFilterType === "today") {
//       const startOfDay = new Date();
//       startOfDay.setHours(0, 0, 0, 0);

//       const endOfDay = new Date();
//       endOfDay.setHours(23, 59, 59, 999);
//       object.date = { $gte: startOfDay, $lte: endOfDay };
//     }

//     if (filter.dateFilterType === "yesterday") {
//       const startOfDay = new Date();
//       startOfDay.setDate(startOfDay.getDate() - 1);
//       startOfDay.setHours(0, 0, 0, 0);

//       const endOfDay = new Date();
//       endOfDay.setDate(endOfDay.getDate() - 1);
//       endOfDay.setHours(23, 59, 59, 999);

//       object.date = { $gte: startOfDay, $lte: endOfDay };
//     }

//     if (filter.dateFilterType === "week") {
//       const startOfDay = new Date();
//       startOfDay.setDate(startOfDay.getDate() - 7);
//       startOfDay.setHours(0, 0, 0, 0);

//       const endOfDay = new Date();
//       endOfDay.setHours(23, 59, 59, 999);

//       object.date = { $gte: startOfDay, $lte: endOfDay };
//     }

//     if (filter.dateFilterType === "month") {
//       const startOfDay = new Date();
//       startOfDay.setDate(startOfDay.getDate() - 30);
//       startOfDay.setHours(0, 0, 0, 0);

//       const endOfDay = new Date();
//       endOfDay.setHours(23, 59, 59, 999);

//       object.date = { $gte: startOfDay, $lte: endOfDay };
//     }

//     if (filter.dateFilterType === "year") {
//       const startOfDay = new Date();
//       startOfDay.setDate(startOfDay.getDate() - 365);
//       startOfDay.setHours(0, 0, 0, 0);

//       const endOfDay = new Date();
//       endOfDay.setHours(23, 59, 59, 999);

//       object.date = { $gte: startOfDay, $lte: endOfDay };
//     }

//     if (filter.fromDate) {
//       const startOfDay = new Date(filter.fromDate);
//       startOfDay.setHours(0, 0, 0, 0);

//       const endOfDay = new Date();
//       endOfDay.setHours(23, 59, 59, 999);

//       object.date = { $gte: startOfDay, $lte: endOfDay };
//     }

//     if (filter.fromDate && filter.toDate) {
//       const startOfDay = new Date(filter.fromDate);
//       startOfDay.setHours(0, 0, 0, 0);

//       const endOfDay = new Date(filter.toDate);
//       endOfDay.setHours(23, 59, 59, 999);

//       object.date = { $gte: startOfDay, $lte: endOfDay };
//     }

//     if (filter.minPrice) {
//       object.pricePerParticipant = { $gte: filter.minPrice };
//     }

//     if (filter.minPrice && filter.maxPrice) {
//       object.pricePerparticipant = {
//         $lte: filter.maxPrice,
//         $gte: filter.minPrice,
//       };
//     }

//     const bookings = await this._bookingRepository.findBookingsWithUser(
//       limit,
//       skip,
//       object as FilterQuery<IBookingModal>
//     );

//     if (!bookings) {
//       throw new AppError("Could not find Bookings", HttpStatusCode.BAD_REQUEST);
//     }

//     return bookings;
//   }
// }

@injectable()
export class SalesReportUsecase implements ISalesReportUsecase {
  constructor(
    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,
  ) {}

  async execute(
    salesQuery: SalesReportQuery,
  ): Promise<{ bookings: BookingWithUser[]; total: number }> {
    const query: FilterQuery<IBookingModal> = {
      paymentStatus: "paid",
    };

    if (salesQuery.hostId) {
      query.hostId = new Types.ObjectId(salesQuery.hostId);
    }

    if (salesQuery.activityId) {
      query.activityId = new Types.ObjectId(salesQuery.activityId);
    }

    // --- Date Filter Handling (Cleaned)
    const dateRange = resolveDateRange(
      salesQuery.filter.dateFilterType,
      salesQuery.filter.fromDate,
      salesQuery.filter.toDate,
    );

    if (dateRange) query.date = dateRange;

    // --- Price Filter
    if (salesQuery.filter.minPrice || salesQuery.filter.maxPrice) {
      query.pricePerParticipant = {};
      if (salesQuery.filter.minPrice)
        query.pricePerParticipant.$gte = salesQuery.filter.minPrice;
      if (salesQuery.filter.maxPrice)
        query.pricePerParticipant.$lte = salesQuery.filter.maxPrice;
    }

    // // --- Booking Status Filter
    // if (filter.status) query.status = filter.status;

    // // --- Search Filter (customer name, booking ID, email)
    // if (filter.search) {
    //   query.$or = [
    //     { "user.name": { $regex: filter.search, $options: "i" } },
    //     { bookingId: { $regex: filter.search, $options: "i" } },
    //     { "user.email": { $regex: filter.search, $options: "i" } },
    //   ];
    // }
    console.log("sales report filter query", query);
    const [bookings, total] = await Promise.all([
      this._bookingRepository.findBookingsWithUser(
        salesQuery.limit,
        salesQuery.skip,
        query,
      ),
      this._bookingRepository.countDocuments(query),
    ]);

    if (!bookings) {
      throw new AppError("Could not find bookings", HttpStatusCode.BAD_REQUEST);
    }

    return { bookings, total };
  }
}
