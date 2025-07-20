import { IBookingModal } from "frameworks/database/mongo/models/booking.model";

export interface ICancelBookingUsecase {
  execute(id: string, message: string): Promise<IBookingModal>;
}
