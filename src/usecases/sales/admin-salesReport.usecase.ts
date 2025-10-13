import { inject, injectable } from "tsyringe";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { IAdminSalesReportUsecase } from "../../entities/usecaseInterfaces/sales/admin-salesReport.interface";

@injectable()
export class AdminSalesReportUsecase implements IAdminSalesReportUsecase {
  constructor(
    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,
  ) {}

  async execute(): Promise<object> {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    const [current, previous] = await Promise.all([
      this._bookingRepository.yearlySales(currentYear),
      this._bookingRepository.yearlySales(previousYear),
    ]);

    return { current, previous };
  }
}
