import { inject, injectable } from "tsyringe";
import { IGetBookingUsecase } from "../../entities/usecaseInterfaces/booking/get-booking.usecase.interface";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { BookingResponseDTO } from "../../shared/dtos/response.dto";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";
import { IBookingMapper } from "../../entities/mapperInterfaces/booking-mapper.interface";

@injectable()
export class GetBookingUsecase implements IGetBookingUsecase {
  constructor(
    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,

    @inject("IBookingMapper")
    private _bookingMapper: IBookingMapper,
  ) {}

  async execute(id: string): Promise<BookingResponseDTO> {
    const order = await this._bookingRepository.findById({ _id: id });

    if (!order) {
      throw new AppError("Invalid booking Id!", HttpStatusCode.BAD_REQUEST);
    }

    return this._bookingMapper.toDTO(order);
  }
}
