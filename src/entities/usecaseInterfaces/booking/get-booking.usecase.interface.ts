import { BookingResponseDTO } from "../../../shared/dtos/response.dto";

export interface IGetBookingUsecase {
  execute(id: string): Promise<BookingResponseDTO>;
}
