import { BookingResponseDTO } from "../../../shared/dtos/response.dto";

export interface IGenerateBookingQRUsecase {
  execute(booking: Partial<BookingResponseDTO>): Promise<BookingResponseDTO>;
}
