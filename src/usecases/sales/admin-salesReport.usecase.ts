import { inject, injectable } from "tsyringe";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { IAdminSalesReportUsecase } from "../../entities/usecaseInterfaces/sales/admin-salesReport.interface";
import { IBookingMapper } from "../../entities/mapperInterfaces/booking-mapper.interface";

@injectable()
export class AdminSalesReportUsecase implements IAdminSalesReportUsecase {
  constructor(
    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,

    @inject("IBookingMapper")
    private _bookingMapper: IBookingMapper,
  ) {}

  async execute(): Promise<object> {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    const [current, previous, bookings] = await Promise.all([
      this._bookingRepository.yearlySales(currentYear),
      this._bookingRepository.yearlySales(previousYear),
      this._bookingRepository.find({
        paymentStatus: "paid",
        date: { $lt: new Date() },
        isCancelled: false,
      }),
    ]);

    return {
      current,
      previous,
      bookings: this._bookingMapper.toDTOs(bookings),
    };
  }
}
