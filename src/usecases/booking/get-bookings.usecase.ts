import { inject, injectable } from "tsyringe";
import { IGetBookedActivityUsecase } from "../../entities/usecaseInterfaces/booking/get-bookings.usecase.interface";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { ICacheService } from "../../entities/serviceInterfaces/cache-service.interface";
import { IBookingMapper } from "../../entities/mapperInterfaces/booking-mapper.interface";

@injectable()
export class GetBookedActivityUsecase implements IGetBookedActivityUsecase {
  constructor(
    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,

    @inject("ICacheService")
    private _cacheService: ICacheService,

    @inject("IBookingMapper")
    private _bookingMapper: IBookingMapper,
  ) {}

  async execute(
    data: object,
    limit: number,
    skip: number,
  ): Promise<{ items: object[]; total: number }> {
    // const cachekey = `order:${skip / limit + 1}:${limit}`;

    // const cached = await this._cacheService.get(cachekey);

    // if (cached) return cached as { items: object[]; total: number };

    const [result, total] = await Promise.all([
      this._bookingRepository.findBookingsWithUser(data, { limit, skip }),
      this._bookingRepository.countDocuments(data),
    ]);

    // await this._cacheService.set(cachekey, result, 60);

    return { items: result, total };
  }
}
