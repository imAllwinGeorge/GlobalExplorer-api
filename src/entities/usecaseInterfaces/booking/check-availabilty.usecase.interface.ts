import { BookingDTO } from "../../../shared/dtos/Auth.dto";

export interface ICheckBookingAvailabiltyUsecase {
  execute(data: BookingDTO): Promise<void>;
}
