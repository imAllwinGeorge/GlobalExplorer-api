import { inject, injectable } from "tsyringe";
import { IGenerateBookingQRUsecase } from "../../entities/usecaseInterfaces/booking/generate-bookingQR.usecase.interface";
import { IQrServices } from "../../entities/serviceInterfaces/qr-service.interface";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { IJwtservice } from "../../entities/serviceInterfaces/jwt-services.interface";
import { expiryDateForQR } from "../../shared/utils/date.helper";
import { IBookingModal } from "../../frameworks/database/mongo/models/booking.model";
import { BookingResponseDTO } from "../../shared/dtos/response.dto";
import { IBookingMapper } from "../../entities/mapperInterfaces/booking-mapper.interface";

@injectable()
export class GenerateBookingQRUsecase implements IGenerateBookingQRUsecase {
  constructor(
    @inject("IQrServices")
    private _qrServices: IQrServices,

    @inject("IJwtService")
    private _jwtServices: IJwtservice,

    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,

    @inject("IBookingMapper")
    private _bookingMapper: IBookingMapper,
  ) {}

  async execute(
    booking: Partial<BookingResponseDTO>,
  ): Promise<BookingResponseDTO> {
    const expiry = expiryDateForQR(booking.date as Date);
    const qrToken = this._jwtServices.qrTokenGenerator(
      {
        bookingId: booking._id,
        userId: booking.userId,
        activityId: booking.activityId,
        activityTitle: booking.activityTitle,
        date: booking.date,
        participantcount: booking.participantCount,
      },
      expiry,
    );

    const qrCode = await this._qrServices.qrGenerate(qrToken);

    const updatedBooking = await this._bookingRepository.findOneAndUpdate(
      { _id: booking._id },
      { qrCode, qrToken },
    );

    return this._bookingMapper.toDTO(updatedBooking as IBookingModal);
  }
}
