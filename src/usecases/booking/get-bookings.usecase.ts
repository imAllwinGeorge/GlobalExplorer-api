import { IBookingRepositoryInterface } from "entities/repositoryInterfaces/booking/booking-repository.interface";
import { IGetBookedActivityUsecase } from "entities/usecaseInterfaces/booking/get-bookings.usecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetBookedActivityUsecase implements IGetBookedActivityUsecase {
  constructor(
    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepositoryInterface,
  ) {}

  async execute(
    data: object,
    limit: number,
    skip: number,
  ): Promise<{ items: object[]; total: number }> {
    const result = await this._bookingRepository.findAll(limit, skip, data);
    return result;
  }
}
