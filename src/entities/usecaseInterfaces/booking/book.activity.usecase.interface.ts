import { IBookingModal } from "frameworks/database/mongo/models/booking.model";

export interface IBookActivityUsecaseInterface {
  execute(data: object, id: string): Promise<IBookingModal>;
}
