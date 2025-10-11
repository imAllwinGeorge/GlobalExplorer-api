import { inject, injectable } from "tsyringe";
import { IHostDashboardUsecase } from "../../entities/usecaseInterfaces/dashboard/host-dashboard.interface";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { IActivityRepository } from "../../entities/repositoryInterfaces/activity/activityRepository.interface";

@injectable()
export class HostDashboardUsecase implements IHostDashboardUsecase {
  constructor(
    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,

    @inject("IActivityRepository")
    private _activityRepository: IActivityRepository,
  ) {}

  async execute(id: string): Promise<Record<string, number | object>> {
    const [
      activityCount,
      bookingCount,
      dashboardData,
      upCommingBooking,
      completedBooking,
      cancelledBooking,
      monthlyBookings,
    ] = await Promise.all([
      this._activityRepository.countDocuments({ userId: id }),
      this._bookingRepository.countDocuments({
        hostId: id,
      }),
      this._bookingRepository.dashboardData(id),
      this._bookingRepository.countDocuments({
        hostId: id,
        date: { $gte: new Date() },
        isCancelled: false,
      }),
      this._bookingRepository.countDocuments({
        hostId: id,
        date: { $lt: new Date() },
        isCancelled: false,
      }),
      this._bookingRepository.countDocuments({
        hostId: id,
        isCancelled: true,
      }),
      this._bookingRepository.monthlyBookings(id),
    ]);

    return {
      activityCount,
      bookingCount,
      dashboardData,
      upCommingBooking,
      completedBooking,
      cancelledBooking,
      monthlyBookings,
    };
  }
}
