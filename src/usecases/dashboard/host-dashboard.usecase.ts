import { IActivityRepository } from "entities/repositoryInterfaces/activity/activityRepository.interface";
import { IBookingRepository } from "entities/repositoryInterfaces/booking/booking-repository.interface";
import { IHostDashboardUsecase } from "entities/usecaseInterfaces/dashboard/host-dashboard.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class HostDashboardUsecase implements IHostDashboardUsecase {
  constructor(
    @inject("IBookingRepository")
    private _bookingRepository: IBookingRepository,

    @inject("IActivityRepository")
    private _activityRepository: IActivityRepository,
  ) {}

  async execute(id: string): Promise<Record<string, number | object>> {
    const [activityCount, bookingCount, dashboardData] = await Promise.all([
      this._activityRepository.countDocuments({ userId: id }),
      this._bookingRepository.countDocuments({
        hostId: id,
        isCancelled: false,
        paymentStatus: "paid",
      }),
      this._bookingRepository.dashboardData(id),
    ]);
    return { activityCount, bookingCount, dashboardData };
  }
}
