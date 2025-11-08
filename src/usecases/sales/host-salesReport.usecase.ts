import { inject, injectable } from "tsyringe";
import { IHostSalesReportUsecase } from "../../entities/usecaseInterfaces/sales/host-salesReport.interface";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { IBookingMapper } from "../../entities/mapperInterfaces/booking-mapper.interface";

@injectable()
export class HostSalesReportUsecase implements IHostSalesReportUsecase {
  constructor(
    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,

    @inject("IBookingMapper")
    private _IBookingMapper: IBookingMapper,
  ) {}

  async execute(id: string): Promise<object> {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    const [current, previous, bookings] = await Promise.all([
      this._bookingRepository.yearlySales(currentYear, id),
      this._bookingRepository.yearlySales(previousYear, id),
      this._bookingRepository.find({
        hostId: id,
        isCancelled: false,
        date: { $lt: new Date() },
        paymentStatus: "paid",
      }),
    ]);

    return {
      current,
      previous,
      bookings: this._IBookingMapper.toDTOs(bookings),
    };
  }
}
