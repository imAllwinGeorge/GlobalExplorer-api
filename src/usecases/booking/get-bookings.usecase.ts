import { IBookingRepository } from "entities/repositoryInterfaces/booking/booking-repository.interface";
import { ICacheService } from "entities/serviceInterfaces/cache-service.interface";
import { IGetBookedActivityUsecase } from "entities/usecaseInterfaces/booking/get-bookings.usecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetBookedActivityUsecase implements IGetBookedActivityUsecase {
  constructor(
    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,

    @inject("ICacheService")
    private _cacheService: ICacheService,
  ) {}

  async execute(
    data: object,
    limit: number,
    skip: number,
  ): Promise<{ items: object[]; total: number }> {
    const cachekey = `order:${skip / limit + 1}:${limit}`;

    const cached = await this._cacheService.get(cachekey);

    if (cached) return cached as { items: object[]; total: number };

    const result = await this._bookingRepository.findAll(limit, skip, data);

    await this._cacheService.set(cachekey, result, 60);

    return result;
  }
}
