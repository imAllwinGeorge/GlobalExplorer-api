import { IBookingControllerInterface } from "entities/controllerInterfaces/Booking-controller.interface";
import { IBookActivityUsecaseInterface } from "entities/usecaseInterfaces/booking/book.activity.usecase.interface";
import { Request, Response } from "express";
import { HttpStatusCode } from "shared/constants/statusCodes";
// import { razorpay } from "shared/utils/razorpay";
import { inject, injectable } from "tsyringe";
import crypto from "crypto";
import { config } from "shared/config";
import { ICheckBookingAvailabiltyUsecase } from "entities/usecaseInterfaces/booking/check-availabilty.usecase.interface";
import { ICreateOrderUsecase } from "entities/usecaseInterfaces/booking/create-order.usecase.interface";

@injectable()
export class BookingController implements IBookingControllerInterface {
  constructor(
    @inject("IBookActivityUsecase")
    private _bookActivityUsecase: IBookActivityUsecaseInterface,

    @inject("ICheckAvailabilityUsecase")
    private _checkAvailabilityUsecase: ICheckBookingAvailabiltyUsecase,

    @inject("ICreateOrderUsecase")
    private _createOrderUsecase: ICreateOrderUsecase,
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
}
