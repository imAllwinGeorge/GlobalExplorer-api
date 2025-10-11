// import { inject, injectable } from "tsyringe";
// import { razorpay } from "../../shared/utils/razorpay";
// import { ICreateOrderUsecase } from "../../entities/usecaseInterfaces/booking/create-order.usecase.interface";
// import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
// import { ICacheService } from "../../entities/serviceInterfaces/cache-service.interface";
// import { BookingDTO } from "../../shared/dtos/Auth.dto";

import { inject, injectable } from "tsyringe";
import { IAvailabilityRepository } from "../../entities/repositoryInterfaces/availability/availability-repository.interface";
import { IReservationRepository } from "../../entities/repositoryInterfaces/reservation/reservation-repository.interface";
import { ICreateOrderUsecase } from "../../entities/usecaseInterfaces/booking/create-order.usecase.interface";
import { ICacheService } from "../../entities/serviceInterfaces/cache-service.interface";
import { BookingDTO } from "../../shared/dtos/Auth.dto";
import mongoose from "mongoose";
import { razorpay } from "../../shared/utils/razorpay";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";
import logger from "../../infrastructures/logger";

// @injectable()
// export class CreateOrderUsecase implements ICreateOrderUsecase {
//   constructor(
//     @inject("IBookingRepository")
//     private _bookingRepository: IBookingRepository,

//     @inject("ICacheService")
//     private _cacheService: ICacheService,
//   ) {}

//   async execute(data: BookingDTO): Promise<object> {
//     const order = await razorpay.orders.create({
//       amount: data.pricePerParticipant * data.participantCount * 100,
//       currency: "INR",
//       receipt: `rcpt_${data.activityId}`,
//       notes: {
//         activityId: data.activityId,
//       },
//     });

//     data.razporpayOrderId = order.id;

//     await this._cacheService.delByPattern(`order:*`);

//     // const bookedActivity = await this._bookingRepository.save(data);

//     return { ...order };
//   }
// }

@injectable()
export class CreateOrderUsecase implements ICreateOrderUsecase {
  constructor(
    @inject("IAvailabilityRepository")
    private _availabilityRepository: IAvailabilityRepository,

    @inject("IReservationRepository")
    private _reservationRepository: IReservationRepository,

    @inject("ICacheService")
    private _cacheService: ICacheService,
  ) {}

  async execute(data: BookingDTO): Promise<object> {
    const order = await razorpay.orders.create({
      amount: data.pricePerParticipant * data.participantCount * 100,
      currency: "INR",
      receipt: `rcpt_${data.activityId}`,
      notes: {
        activityId: data.activityId,
      },
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const availability = await this._availabilityRepository.findOne(
        { activityId: data.activityId, date: data.date },
        session,
      );

      if (!availability) {
        throw new AppError(
          "Availability not found for this date",
          HttpStatusCode.NOT_FOUND,
        );
      }
      console.log("availability fetched    : ", availability);
      if (availability.availableSeats < data.participantCount) {
        throw new AppError(
          "Not enough seats available!",
          HttpStatusCode.BAD_REQUEST,
        );
      }

      await this._availabilityRepository.findOneAndUpdate(
        { _id: availability._id },
        { availableSeats: availability.availableSeats - data.participantCount },
        session,
      );

      const reservation = await this._reservationRepository.save(
        {
          userId: data.userId,
          activityId: data.activityId,
          date: data.date.toString(),
          seats: data.participantCount,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        },
        session,
      );

      await session.commitTransaction();
      session.endSession();

      await this._cacheService.delByPattern(`order:*`);

      const reservationObject = JSON.parse(JSON.stringify(reservation));

      return { ...reservationObject, ...order };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      logger.error(error);
      throw new AppError(
        "failed to place the order!",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await this._cacheService.delByPattern(`order:*`);
    }
  }
}
