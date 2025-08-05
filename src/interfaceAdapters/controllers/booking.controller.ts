import { IBookingController } from "entities/controllerInterfaces/Booking-controller.interface";
import { IBookActivityUsecase } from "entities/usecaseInterfaces/booking/book.activity.usecase.interface";
import { Request, Response } from "express";
import { HttpStatusCode } from "shared/constants/constants";
// import { razorpay } from "shared/utils/razorpay";
import { inject, injectable } from "tsyringe";
import crypto from "crypto";
import { config } from "shared/config";
import { ICheckBookingAvailabiltyUsecase } from "entities/usecaseInterfaces/booking/check-availabilty.usecase.interface";
import { ICreateOrderUsecase } from "entities/usecaseInterfaces/booking/create-order.usecase.interface";
import { IGetBookedActivityUsecase } from "entities/usecaseInterfaces/booking/get-bookings.usecase.interface";
import { ICancelBookingUsecase } from "entities/usecaseInterfaces/booking/cancel.booking.usecase.interface";

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
  ) {}

  // async bookActivity(req: Request, res: Response): Promise<void> {
  //   try {
  //     console.log("hit it in the controller");
  //     const { data } = req.body;
  //     const booking = this._bookActivityUsecase.execute(data, id );
  //     res.status(HttpStatusCode.CREATED).json({ booking });
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       res
  //         .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
  //         .json({ message: "Internal Sever Error" });
  //       return;
  //     }
  //   }
  // }

  async createRazorpayOrder(req: Request, res: Response): Promise<void> {
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

    await this._checkAvailabilityUsecase.execute(data);
    const bookedActivity = await this._createOrderUsecase.execute(data);
    console.log("Booked activity: ", bookedActivity);
    res.json(bookedActivity);
  }

  async verifyPayment(req: Request, res: Response): Promise<void> {
    try {
      const {
        _id,
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

      // continue with transfer logic
      const data = {
        _id,
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
      console.log(data);
      const booking = await this._bookActivityUsecase.execute(data, _id);
      res
        .status(HttpStatusCode.CREATED)
        .json({ success: true, paymentId: razorpay_payment_id, booking });
    } catch (error) {
      console.log("Error while saving the booking details:", error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Unable to process the payment" });
    }
  }

  async getBookings(req: Request, res: Response): Promise<void> {
    try {
      const id = req.query.id;
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const skip = (page - 1) * limit;
      console.log(id, page, limit, skip);
      const result = await this._getBookedActivityUsecase.execute(
        { userId: id },
        limit,
        skip,
      );
      const totalPages = Math.ceil(result.total / limit);
      res
        .status(HttpStatusCode.OK)
        .json({ bookings: result.items, totalPages });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
        return;
      }
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Error fetching booking details" });
    }
  }

  async cancelBooking(req: Request, res: Response): Promise<void> {
    try {
      const id = req.query.id as string;
      const message = req.query.message as string;
      console.log(id, message);
      const booking = await this._cancelBookingUsecase.execute(id, message);
      console.log("Cancelled booking from cancel booking: ", booking);
      res.status(HttpStatusCode.OK).json({ message: booking });
    } catch (error) {
      if (error instanceof Error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
        return;
      }
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }
  async getActivityBookings(req: Request, res: Response): Promise<void> {
    try {
      const id = req.query.id;
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const skip = (page - 1) * limit;
      console.log(id, page, limit, skip);
      const result = await this._getBookedActivityUsecase.execute(
        { hostId: id },
        limit,
        skip,
      );
      const totalPages = Math.ceil(result.total / limit);
      res
        .status(HttpStatusCode.OK)
        .json({ bookings: result.items, totalPages });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
        return;
      }
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Error fetching booking details" });
    }
  }
}
