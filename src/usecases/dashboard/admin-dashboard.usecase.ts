import { inject, injectable } from "tsyringe";
import { IAdminDashboardUsecase } from "../../entities/usecaseInterfaces/dashboard/admin-dashboard.interface";
import { IUserRepository } from "../../entities/repositoryInterfaces/users/user-repository.interface";
import { IHostRepository } from "../../entities/repositoryInterfaces/users/host-repository.interface";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";

@injectable()
export class AdminDashboardUsecase implements IAdminDashboardUsecase {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRepository,

    @inject("IHostRepository")
    private _hostRepository: IHostRepository,

    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,
  ) {}

  async execute(): Promise<Record<string, number | object>> {
    const [
      userCount,
      hostCount,
      bookingCount,
      cancelledBooking,
      upCommingBooking,
      completedBooking,
      dashboardData,
      monthlyBookings,
    ] = await Promise.all([
      this._userRepository.countDocuments({}),
      this._hostRepository.countDocuments({}),
      this._bookingRepository.countDocuments({}),
      this._bookingRepository.countDocuments({ isCancelled: true }),
      this._bookingRepository.countDocuments({
        date: { $gte: new Date() },
        isCancelled: false,
      }),
      this._bookingRepository.countDocuments({
        date: { $lt: new Date() },
        isCancelled: false,
      }),
      this._bookingRepository.dashboardData(),
      this._bookingRepository.monthlyBookings(),
    ]);

    return {
      userCount,
      hostCount,
      bookingCount,
      cancelledBooking,
      upCommingBooking,
      completedBooking,
      dashboardData,
      monthlyBookings,
    };
  }
}
