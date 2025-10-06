import { BookingResponseDTO } from "../../../shared/dtos/response.dto";

export interface ICancelBookingUsecase {
  execute(id: string, message: string): Promise<BookingResponseDTO>;
}
