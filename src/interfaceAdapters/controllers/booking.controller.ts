import { inject, injectable } from "tsyringe";
import crypto from "crypto";
import { IBookingController } from "../../entities/controllerInterfaces/Booking-controller.interface";
import { IBookActivityUsecase } from "../../entities/usecaseInterfaces/booking/book.activity.usecase.interface";
import { ICheckBookingAvailabiltyUsecase } from "../../entities/usecaseInterfaces/booking/check-availabilty.usecase.interface";
import { ICreateOrderUsecase } from "../../entities/usecaseInterfaces/booking/create-order.usecase.interface";
import { IGetBookedActivityUsecase } from "../../entities/usecaseInterfaces/booking/get-bookings.usecase.interface";
import { ICancelBookingUsecase } from "../../entities/usecaseInterfaces/booking/cancel.booking.usecase.interface";
import { NextFunction, Request, Response } from "express";
import {
  calculateTotalPages,
  getPaginationParams,
} from "../../shared/utils/pagination.helper";
import { HttpStatusCode } from "../../shared/constants/constants";
import { config } from "../../shared/config";
import { IGetBookingUsecase } from "../../entities/usecaseInterfaces/booking/get-booking.usecase.interface";
import { FilterQuery, Types } from "mongoose";
import { IGenerateBookingQRUsecase } from "../../entities/usecaseInterfaces/booking/generate-bookingQR.usecase.interface";
import { IQRVerificationUsecase } from "../../entities/usecaseInterfaces/booking/qr-verification.usecase.interface";
import { IAvailableSlotUsecase } from "../../entities/usecaseInterfaces/booking/available-slots.usecase.interface";
import { IActivityAvailabilityUsecase } from "../../entities/usecaseInterfaces/booking/activity-availability.usecase.interface";

@injectable()
export class BookingController implements IBookingController {
  constructor(
    @inject("IBookActivityUsecase")
    private _bookActivityUsecase: IBookActivityUsecase,

    @inject("ICheckAvailabilityUsecase")
    private _checkAvailabilityUsecase: ICheckBookingAvailabiltyUsecase,

    @inject("ICreateOrderUsecase")
    private _createOrderUsecase: ICreateOrderUsecase,

    @inject("IGetBookedActivityUsecase")
    private _getBookedActivityUsecase: IGetBookedActivityUsecase,

    @inject("ICancelBookingUsecase")
    private _cancelBookingUsecase: ICancelBookingUsecase,

    @inject("IGetBookingUsecase")
    private _getBookingUsecase: IGetBookingUsecase,

    @inject("IGenerateBookingQRUsecase")
    private _generateBookingQRUsecase: IGenerateBookingQRUsecase,

    @inject("IQRVerificationUsecase")
    private _qrVerificationUsecase: IQRVerificationUsecase,

    @inject("IAvailableSlotUsecase")
    private _availableSlotUsecase: IAvailableSlotUsecase,

    @inject("IActivityAvailabilityUsecase")
    private _activityAvailabilityUsecase: IActivityAvailabilityUsecase,
  ) {}

  async createRazorpayOrder(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const {
        activityId,
        activityTitle,
        participantCount,
        userId,
        hostId,
        date,
        holdUntilDate,
        pricePerParticipant,
      } = req.body;

      const data = {
        activityId,
        activityTitle,
        participantCount: Number(participantCount),
        userId,
        hostId,
        date,
        pricePerParticipant: Number(pricePerParticipant),
        holdUntilDate,
      };
      console.log(" user: sented data: for create order   :", data);
      const bookedActivity = await this._createOrderUsecase.execute(data);
      res.json(bookedActivity);
    } catch (error) {
      next(error);
    }
  }

  async verifyPayment(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        hostId,
        userId,
        activityId,
        activityTitle,
        date,
        pricePerParticipant,
        participantCount,
        holdUntilDate,
      } = req.body;

      const generated_signature = crypto
        .createHmac("sha256", config.razorpay.RAZORPAY_SECRET!)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

      if (generated_signature !== razorpay_signature) {
        console.log(
          "signature miss match  :",
          generated_signature,
          razorpay_signature,
        );
        res.status(400).json({ message: "Signature mismatch" });
        return;
      }

      const data = {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        hostId,
        userId,
        activityId,
        activityTitle,
        date,
        pricePerParticipant: Number(pricePerParticipant),
        participantCount,
        holdUntilDate,
      };

      const booking = await this._bookActivityUsecase.execute(data);

      const updatedBooking =
        await this._generateBookingQRUsecase.execute(booking);

      res.status(HttpStatusCode.CREATED).json({
        success: true,
        paymentId: razorpay_payment_id,
        booking: updatedBooking,
      });
    } catch (error) {
      next(error);
    }
  }

  async getBookings(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.query.id;

      const { limit, skip } = getPaginationParams(req);

      const result = await this._getBookedActivityUsecase.execute(
        { userId: new Types.ObjectId(userId as string) },
        limit,
        skip,
      );

      const totalPages = calculateTotalPages(result.total, limit);

      res
        .status(HttpStatusCode.OK)
        .json({ bookings: result.items, totalPages });
    } catch (error) {
      next(error);
    }
  }

  async cancelBooking(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const bookingId = req.query.id as string;
      const message = req.query.message as string;

      const booking = await this._cancelBookingUsecase.execute(
        bookingId,
        message,
      );

      res.status(HttpStatusCode.OK).json({ booking: booking });
    } catch (error) {
      next(error);
    }
  }

  async getActivityBookings(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { hostId, search, filter } = req.query;

      const { limit, skip } = getPaginationParams(req);
      let query;
      if (filter === "upcomming") {
        query = { date: { $gt: new Date() } };
      } else if (filter === "completed") {
        query = { date: { $lt: new Date() } };
      } else {
        query = { isCancelled: true };
      }

      const filterObject: FilterQuery<object> = {
        hostId: new Types.ObjectId(hostId as string),
        ...query,
      };

      if ((search as string).trim().length > 0) {
        filterObject.activityTitle = { $regex: search, $options: "i" };
      }

      const result = await this._getBookedActivityUsecase.execute(
        filterObject,
        limit,
        skip,
      );
      const availableSlots = await this._availableSlotUsecase.execute(
        hostId as string,
      );

      const totalPages = calculateTotalPages(result.total, limit);

      res
        .status(HttpStatusCode.OK)
        .json({ bookings: result.items, totalPages, availableSlots });
    } catch (error) {
      next(error);
    }
  }

  async getBooking(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { orderId } = req.params;
      console.log("get booking: ....", orderId);
      const order = await this._getBookingUsecase.execute(orderId);

      res.status(HttpStatusCode.OK).json({ booking: order });
    } catch (error) {
      next(error);
    }
  }

  async qrVerification(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const token = req.body.token;

      const result = await this._qrVerificationUsecase.execute(token);
      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getBookingToday(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { hostId } = req.params;
      const { limit, skip } = getPaginationParams(req);

      const startOfDay = new Date();
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setUTCHours(23, 59, 59, 999);

      const query = {
        hostId: new Types.ObjectId(hostId as string),
        date: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      };

      const result = await this._getBookedActivityUsecase.execute(
        query,
        limit,
        skip,
      );

      const totalPages = calculateTotalPages(result.total, limit);

      console.log(result);

      res
        .status(HttpStatusCode.OK)
        .json({ bookings: result.items, totalPages });
    } catch (error) {
      next(error);
    }
  }
  async activityAvailability(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { activityId, date } = req.query;

      const result = await this._activityAvailabilityUsecase.execute(
        activityId as string,
        date as string,
      );

      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}
