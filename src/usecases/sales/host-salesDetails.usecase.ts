import { inject, injectable } from "tsyringe";
import { IHostSalesDetailsUsecase } from "../../entities/usecaseInterfaces/sales/host-salesDetails.interface";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";

@injectable()
export class HostSalesDetailsUsecase implements IHostSalesDetailsUsecase {
  constructor(
    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,
  ) {}

  async execute(id: string): Promise<object> {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    const [current, previous] = await Promise.all([
      this._bookingRepository.yearlySales(currentYear, id),
      this._bookingRepository.yearlySales(previousYear, id),
    ]);

    return {
      current,
      previous,
    };
  }
}
