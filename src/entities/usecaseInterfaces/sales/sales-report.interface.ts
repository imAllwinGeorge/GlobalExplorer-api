import { BookingWithUser, SalesReportQuery } from "../../../shared/types/types";

export interface ISalesReportUsecase {
  execute(
    salesQuery: SalesReportQuery,
  ): Promise<{ bookings: BookingWithUser[]; total: number }>;
}
