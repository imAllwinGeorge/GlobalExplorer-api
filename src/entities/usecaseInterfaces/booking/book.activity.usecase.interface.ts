import { IBookingModal } from "frameworks/database/mongo/models/booking.model";

export interface IBookActivityUsecase {
  execute(data: object, id: string): Promise<IBookingModal>;
}
