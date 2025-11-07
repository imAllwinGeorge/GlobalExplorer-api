import { inject, injectable } from "tsyringe";
import { IQRVerificationUsecase } from "../../entities/usecaseInterfaces/booking/qr-verification.usecase.interface";
import { IJwtservice } from "../../entities/serviceInterfaces/jwt-services.interface";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { HttpStatusCode } from "axios";
import { AppError } from "../../shared/errors/appError";
import { Types } from "mongoose";
import { IUserRepository } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IBookingMapper } from "../../entities/mapperInterfaces/booking-mapper.interface";
import { IUserMapper } from "../../entities/mapperInterfaces/user-mapper.interface";
import {
  BookingResponseDTO,
  UserResponseDTO,
} from "../../shared/dtos/response.dto";
import { IBookingModal } from "../../frameworks/database/mongo/models/booking.model";
import { IUserModel } from "../../frameworks/database/mongo/models/user.model";

@injectable()
export class QRVerificationUsecase implements IQRVerificationUsecase {
  constructor(
    @inject("IJwtService")
    private _jwtServices: IJwtservice,

    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,

    @inject("IUserRepository")
    private _userRepository: IUserRepository,

    @inject("IBookingMapper")
    private _bookingMapper: IBookingMapper,

    @inject("IUserMapper")
    private _userMapper: IUserMapper,
  ) {}

  async execute(token: string): Promise<{
    booking: BookingResponseDTO;
    user: UserResponseDTO;
  }> {
    const payload = this._jwtServices.veriyQRToken(token);

    console.log("Qr verification payload: ", payload);

    console.log(typeof payload.bookingId);

    const booking = await this._bookingRepository.findById({
      _id: new Types.ObjectId(payload.bookingId),
    });

    if (!booking) {
      throw new AppError(
        "Booking not found",
        HttpStatusCode.InternalServerError,
      );
    }

    if (
      booking.qrToken === null ||
      booking.qrToken !== token ||
      booking.bookingStatus === "completed"
    ) {
      throw new AppError(
        "QR Code already used or Expired",
        HttpStatusCode.InternalServerError,
      );
    }

    const [updatedBooking, user] = await Promise.all([
      this._bookingRepository.findOneAndUpdate(
        { _id: new Types.ObjectId(payload.bookingId) },
        { bookingStatus: "completed" },
      ),
      this._userRepository.findById({ _id: booking.userId }),
    ]);
    return {
      booking: this._bookingMapper.toDTO(updatedBooking as IBookingModal),
      user: this._userMapper.toDTO(user as IUserModel),
    };
  }
}
